import pandas as pd
import csv

final_list = []
rows = []

with open("csv/137_project.csv", "r") as f:
    csvreader = csv.reader(f)
    for row in csvreader:
        rows.append(row)

headers = rows[0]
star_datas = rows[1:]

for star_data in star_datas:
    temp_dictionary = {
        "name": star_data[1],
        "distance": star_data[2],
        "mass": star_data[3],
        "radius": star_data[4],
        "gravity": star_data[5],
    }
    final_list.append(temp_dictionary)

print(final_list)