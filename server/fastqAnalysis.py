import sys
import os
import json

from random import randint
from pyBioTools import Fastq
from pyBioTools.common import jhelp

# output_path = "../client/public/output/filtered_" + randint(1000,500) + ".fastq"
# username = os.getlogin() 
# outputDir = f'C:\\Users\\{username}\\Downloads\\filtered.fastq'

# try:
#     os.unlink(output_path)
# except:
#     pass

# inputs = sys.argv[1]

# min_len = inputs["min_len"]
# min_qual = inputs["min_qual"]
inputs = json.loads(sys.argv[1])


outPut = Fastq.Filter("../fileExchange/uploads/userFile.fastq", '../fileExchange/output/filtered.fastq', 
                min_len=inputs["min_len"], min_qual=inputs["min_qual"], remove_duplicates=True, verbose=True)
# f = open("../client/public/output/myfile.txt", "w")

# print(inputs["min_len"])
print(outPut, flush=True)

# sys.stdout.flush()