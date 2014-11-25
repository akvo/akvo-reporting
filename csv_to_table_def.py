# -*- coding: utf-8 -*-

# Akvo RSR is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.
#################################################################################################

# Utility script that outputs the CREATE TABLE SQL needed to host the data of a CSV file,
# along with the SQL for importing same file. The script infers the column data types in a simple way.

#################################################################################################

import os
import sys
import tablib

CREATE_TABLE_TEMPLATE = """CREATE TABLE {table_name} (
    {rows}
);"""
VARCHAR_LEN = 100

def infer_datatype(data, column):
    """
    :param data: the tablib dataset
    :param column: the column name
    :return: the Postgres type to use for this column
    """
    def _type(s):
        """
        determine if we can parse the input string as an integer or a float
        :param s: string to test
        :return: Postgres field data type
        """
        try:
            _ = int(s)
            return "integer"
        except ValueError:
            pass
        try:
            _ = float(s)
            return "float"
        except ValueError:
            pass
        return "varchar({})".format(VARCHAR_LEN)

    # determine the type of data in each column
    types = [_type(cell) for cell in data[str(column)] if cell is not u'']
    # if all types are identical then we use that type
    if len(set(types)) == 1:
        return types[0]
    # otherwise we use varchar
    return "varchar({})".format(VARCHAR_LEN)

def generate_sql(file_name, table_name):
    """
    Generate the sql for the creation of a table holding the data of the CSV
    :param file_name: CSV file
    :param table_name: optional name of DB table, otherwise the CSV file name's used
    :return: the CREATE TABLE SQL
    """
    with open(file_name, 'r') as f:
        data = tablib.Dataset()
        data.csv = f.read()
    field_types = [infer_datatype(data, column) for column in data.headers]
    rows = [
        "{} {}".format(colname, field_type) for field_type, colname in zip(
            field_types, data.headers
        )
    ]
    return CREATE_TABLE_TEMPLATE.format(
        table_name=table_name,
        rows=",\n    ".join(rows),
    )

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print "Usage: python csv_to_table.py csvfile.csv [table_name]"
    else:
        try:
            table_name = sys.argv[2]
        except:
            table_name = os.path.splitext(sys.argv[1])[0]
        file_name = sys.argv[1]
        print generate_sql(file_name, table_name)
        print "COPY {} FROM '/path/to/csv/file.csv' DELIMITER ',' CSV HEADER;".format(table_name)