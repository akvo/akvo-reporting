# -*- coding: utf-8 -*-

# Akvo Reporting is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.


import csv
import sys

from drakeutil import *


def change_delimiter(file_name):
    """ csv converter aimed at use in Drake. takes a ","-delimited csv and returns a tab-delimited one
    """
    DELIMITERS = ","
    with open(file_name, 'rbU') as csvfile, sys.stdout as outfile:
        dialect = csv.Sniffer().sniff(csvfile.read(32768), delimiters=DELIMITERS)
        csvfile.seek(0)
        reader = csv.reader(csvfile, dialect)
        writer = csv.writer(outfile, delimiter='\t')
        writer.writerows(reader)

if __name__ == '__main__':
    # either get file name from command line arg or from Drake INPUT var
    try:
        file_name = sys.argv[1]
    except:
        file_name = INPUT

    change_delimiter(file_name)
