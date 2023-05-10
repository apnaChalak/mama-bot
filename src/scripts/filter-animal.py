
from pydoc import html
import requests
import json
import time 


animalObject =   {
  "animal-categories-href": "",
    "animal-Name": "",
    "general-Info": ""
  }



# Read data from the original JSON file
with open('/Users/arken/chalak/chalak-bot-data/assets/apniKheti-Animal.json', 'r') as file:
    data = json.load(file)

filtered_data = []  # To store the filtered data
cropNames = []
prev_animal_Name = None
# Iterate over the objects in the original data
for i, obj in enumerate(data):
    animal_Name = obj['animal-Name']
    plant_protection = obj['general-Info']

    for j in range(i, len(data)):
         # Check if the crop name is the same as the next row
        if j + 1 < len(data) and animal_Name == data[j + 1]['animal-Name']:
            # Add plant protection parameters to the current row's 'general-Info'
             obj['general-Info'] += ', ' + data[j + 1]['general-Info']

 # Check if the crop name is different from the previous row
    if animal_Name != prev_animal_Name:
                
        animalObject =   {
             "animal-categories-href": obj['animal-categories-href'],
            "animal-Name": obj['animal-Name'],
            "general-Info": obj["general-Info"]
        }

        filtered_data.append(animalObject)
        cropNames.append(animal_Name)
        prev_animal_Name = animal_Name
   
    animalObject =   {
         "animal-categories-href": "",
        "animal-Name": "",
        "general-Info": ""
    }

# Write the filtered data to a new JSON file
with open('filtered_animal_data.json', 'w') as file:
    json.dump(filtered_data, file, indent=4)