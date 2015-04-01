# -*- coding: utf-8 -*-

# Akvo Reporting is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.

###################################################################################################

# Utility script that outputs the CREATE TABLE SQL needed to host the data of a CSV file,
# along with the SQL for importing same file. The script infers the column data types in a simple way.

###################################################################################################

import re
import sys
import tablib

from drakeutil import *
from time import strptime


CREATE_TABLE_TEMPLATE = """CREATE TABLE {table_name} (
    {rows}
);"""

def infer_datatype(date_format, data, column):
    """
    :param data: the tablib dataset
    :param column: the column name
    :return: the Postgres type to use for this column
    """
    def _type(s):
        """
        determine if we can parse the input string as an integer or a float
        :param s: string to test
        :return: Postgres field data type and length if it's varchar
        """
        try:
            _ = strptime(s, date_format)
            return "date", 0
        except ValueError, TypeError:
            pass

        try:
            _ = int(s)
            return "integer", 0
        except ValueError:
            pass
        try:
            _ = float(s)
            return "float", 0
        except ValueError:
            pass
        return "varchar", len(s)

    # determine the type of data in each column
    # first get the type for each row
    items = [_type(item) for item in data[str(column)] if item is not u'']
    # is there any data?
    if items:
        # data types and lengths if it's varchar
        types, lengths = zip(*items)
        # if all types are identical we use that type
        types = list(set(types))
        if len(types) == 1:
            if types[0] is not 'varchar':
                return types[0]
        # mix of ints and floats
        if 'varchar' not in types:
            return 'float'
        # otherwise we use varchar
        return "varchar({})".format(max(lengths))
    # otherwise return a dummy for an empty column
    else:
        return 'varchar(1)'


def generate_sql(table_name, date_format):
    """
    Generate the sql for the creation of a table holding the data of the CSV
    :param file_name: CSV file
    :param table_name: optional name of DB table, otherwise the CSV file name's used
    :return: the CREATE TABLE SQL
    """
    try:
        file = INPUT
    except:
        file = 'data.csv'
    with open(file, 'rU') as f:
        data = tablib.Dataset()
        data.csv = f.read()
        # generate field names from column headers
        # replace " " with "_"
        data.headers = [re.sub(' +', '_', header) for header in data.headers]
        # field identifiers start with a letter and then can have letters, numbers and underscores
        data.headers = [re.sub('\W*', '', header) for header in data.headers]
        # remove any trailing "_" and make it all lowercase
        data.headers = [header.strip('_').lower() for header in data.headers]
        # add _ to beginning of identifier if it starts with a number
        data.headers = ["_{}".format(header) if header and header[0] in [unicode(i) for i in range(10)] else header for header in data.headers]
        # give empty column headers a label "columnN" where N is the column count
        data.headers = [header if header else "column{}".format(i) for i, header in enumerate(data.headers)]

    data_types = [infer_datatype(date_format, data, column) for column in data.headers]
    rows = [
        "{} {}".format(colname, field_type) for field_type, colname in zip(
            data_types, data.headers
        )
    ]
    return CREATE_TABLE_TEMPLATE.format(
        table_name=table_name,
        rows=",\n    ".join(rows),
    )

if __name__ == '__main__':
    if len(sys.argv) < 1:
        print "Usage: python csv_to_table.py table_name [date_format]"
    else:
        table_name = sys.argv[1]
        try:
            date_format = sys.argv[2]
        except:
            # set default date format to "DD-MM-YYYY HH:MM:SS UTC"
            date_format = "%d-%m-%Y %H:%M:%S UTC"
        print generate_sql(table_name, date_format)
