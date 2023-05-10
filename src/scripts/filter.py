
from pydoc import html
import requests
import json
import time 


cropobject =   {
    "crop-links-href": "",
    "crop-name": "",
    "general-info": "",
    "suitable-climate": "",
    "soil-info": "",
    "varieties": "",
    "land-preperation": "",
    "sowing": "",
    "seed": "",
    "fertilizer": "",
    "weed-contol": "",
    "irrigation": "",
    "plat-protection": ""
  }

# filteredData= []
# cropsData = []
# FinalCropsDataJson = []

# arrayTwiter = []
# with open("/Users/arken/chalak/chalak-bot-data/assets/apnikheti-crops.json", "r") as file:
#     cropsData = json.load(file)

# # with open("daos 23_3_23.json", "r") as file:
# #     allTrutsData = json.load(file)

# # for eachTrut in allTrutsData:
   
# #     arrayTwiter.append(eachTrut["twitter_link"].lower())

# for i in range(0 , len(cropsData)) :
#     protectoin = ""
#     if(cropsData[i]["crop-name"].lower() == cropsData[i+1]["crop_name"].lower) :
#         cropsData[i]["plat-protection"]= cropsData[i+1]["plat-protection"]


# with open("FilteredData.json", "w") as file:
#     json.dump(filteredData,file)



# Read data from the original JSON file
with open('/Users/arken/chalak/chalak-bot-data/assets/apnikheti-crops.json', 'r') as file:
    data = json.load(file)

filtered_data = []  # To store the filtered data
cropNames = []
prev_crop_name = None
# Iterate over the objects in the original data
for i, obj in enumerate(data):
    crop_name = obj['crop-name']
    plant_protection = obj['plat-protection']

    for j in range(i, len(data)):
         # Check if the crop name is the same as the next row
        if j + 1 < len(data) and crop_name == data[j + 1]['crop-name']:
            # Add plant protection parameters to the current row's 'plat-protection'
             obj['plat-protection'] += ', ' + data[j + 1]['plat-protection']

 # Check if the crop name is different from the previous row
    if crop_name != prev_crop_name:
                
        cropobject =   {
            "crop-links-href": obj["crop-links-href"],
            "crop-name": obj["crop-name"],
            "general-info": obj["general-info"],
            "suitable-climate": obj["suitable-climate"],
            "soil-info": obj["soil-info"],
            "varieties": obj["varieties"],
            "land-preperation": obj["land-preperation"],
            "sowing": obj["sowing"],
            "seed": obj["seed"],
            "fertilizer": obj["fertilizer"],
            "weed-contol": obj["weed-contol"],
            "irrigation": obj["irrigation"],
            "plat-protection": obj["plat-protection"]
        }

        filtered_data.append(cropobject)
        cropNames.append(crop_name)
        prev_crop_name = crop_name
   
    cropobject =   {
        "crop-links-href": "",
        "crop-name": "",
        "general-info": "",
        "suitable-climate": "",
        "soil-info": "",
        "varieties": "",
        "land-preperation": "",
        "sowing": "",
        "seed": "",
        "fertilizer": "",
        "weed-contol": "",
        "irrigation": "",
        "plat-protection": ""
    }

# Write the filtered data to a new JSON file
with open('filtered_crop_data.json', 'w') as file:
    json.dump(filtered_data, file, indent=4)