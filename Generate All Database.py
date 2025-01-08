import os
import shutil
import sqlite3
import xml.etree.ElementTree as ET
import re
import scipy.stats as stats
import matplotlib.pyplot as plt
from docx import Document
from matplotlib.backends.backend_pdf import PdfPages


# Connect to the SQLite database
conn = sqlite3.connect("grading_equation_reference_data_All.db")
cursor = conn.cursor()

# Drop the table if it exists
cursor.execute('DROP TABLE IF EXISTS variables')

# Create the variables table
cursor.execute('''
   CREATE TABLE variables (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       session_data_id TEXT NOT NULL,
       file_name TEXT NOT NULL,
       Pitch TEXT,
       Score REAL,
       Linear_Pelvis_Speed REAL,
       HSS_Footplant REAL,
       Pelvis_Ang_Footplant REAL,
       Trunk_Ang_Footplant REAL,
       Pelvic_Obl REAL,
       Front_Leg_Brace REAL,
       Front_Leg_Var_Val REAL,
       Lead_Leg_Midpoint REAL,
       Lead_Leg_GRF_y REAL,
       Lead_Leg_GRF_z REAL,
       Lead_Leg_GRF_x REAL,
       Horizontal_Abduction REAL,
       Shld_ER_Footplant REAL,
       Shld_ER_Max REAL,
       Lateral_Trunk_Tilt REAL,
       Pelvis_Ang_Velo REAL,
       Torso_Ang_Velo REAL,
       Arm_Ang_Velo REAL,
       MPH REAL,
       Trunk_Ang_MER REAL,
       Trunk_Ang_Rel REAL,
       Pelvis_Ang_MER REAL,
       Pelvis_Ang_Rel REAL,
       HSS_MER REAL,
       HSS_Rel REAL,
       Front_Leg_Footplant REAL,
       Front_Leg_MER REAL,
       Front_Leg_Rel REAL,
       Abduction_Max REAL,
       Hand_Ang_Velo REAL,
       Stride_Length REAL,
       Arm_Slot REAL,
       Weight REAL
   )
''')

# Commit the changes before proceeding to parsing XML files
conn.commit()

# List of XML files to parse (replace this with your actual directory path)
directory_path = r"C:\Users\q\PycharmProjects\Rename_Session.xml\Pitching Data\Kinematic Data\All"

while True:
    # Get a list of XML files in the specified directory
    xml_files = [os.path.join(directory_path, file) for file in os.listdir(directory_path) if file.endswith(".xml")]

    # Track the number of new data entries
    new_data_entries = 0

    for file_name in xml_files:
        try:
            # Check if the file has already been processed
            cursor.execute('SELECT COUNT(*) FROM variables WHERE file_name = ?', (file_name,))
            count = cursor.fetchone()[0]

            if count == 0:
                # Parse the XML file
                tree = ET.parse(file_name)
                root = tree.getroot()

                # Extract session_data_id from the file name
                session_data_id_match = re.search(r"session_data_(.+)\.xml", file_name)
                if session_data_id_match:
                    session_data_id = session_data_id_match.group(1)
                else:
                    session_data_id = None

                # Check if session_data_id is None, and skip the file if it is
                if session_data_id is not None:
                    # Iterate over all occurrences of "owner" element with a value containing "Fastball"
                    for owner_element in root.findall('.//owner'):
                        if 'Fastball' in owner_element.get('value', ''):
                            fastball_owner = owner_element
                            # Extract and insert data into the database
                            linear_pelvis_speed = None
                            hss_footplant = None
                            pelvis_ang_fp = None
                            trunk_ang_fp = None
                            pelvis_obl = None
                            front_leg_brace = None
                            front_leg_var_val = None
                            lead_leg_midpoint = None
                            lead_leg_grf_y = None
                            lead_leg_grf_z = None
                            lead_leg_grf_x = None
                            horizontal_abduction = None
                            shld_er_fp = None
                            shld_er_max = None
                            lateral_trunk_tilt = None
                            pelvis_ang_velo = None
                            torso_ang_velo = None
                            arm_ang_velo = None
                            Trunk_Ang_MER = None
                            Trunk_Ang_Rel = None
                            Pelvis_Ang_MER = None
                            Pelvis_Ang_Rel = None
                            HSS_MER = None
                            HSS_Rel = None
                            lead_knee_ang_at_footstrike = None
                            Front_Leg_MER = None
                            lead_knee_ang_at_release = None
                            Abduction_Max = None
                            Hand_Ang_Velo = None
                            Stride_Length = None
                            Arm_Slot = None
                            Weight = None

                            # Extract the value of "owner"
                            pitch_value = fastball_owner.get('value', '')

                            for variable_element in fastball_owner.findall('.//name[@value]'):
                                variable_name = variable_element.attrib['value']
                                component_x_element = variable_element.find('./component[@value="X"]')
                                component_y_element = variable_element.find('./component[@value="Y"]')
                                component_z_element = variable_element.find('./component[@value="Z"]')

                                if variable_name == "MaxPelvisLinearVel_MPH" and component_y_element is not None:
                                    linear_pelvis_speed = float(component_y_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Hip Shoulders Sep@Footstrike" and component_z_element is not None:
                                    hss_footplant = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pitching_Shoulder_Angle@Release" and component_x_element is not None:
                                    Arm_Slot = float(component_x_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Hip Shoulders Sep@Max_Shoulder_Rot" and component_z_element is not None:
                                    HSS_MER = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Hip Shoulders Sep@Release" and component_z_element is not None:
                                    HSS_Rel = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pelvis_Angle@Footstrike" and component_z_element is not None:
                                    pelvis_ang_fp = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pelvis_Angle@Max_Shoulder_Rot" and component_z_element is not None:
                                    Pelvis_Ang_MER = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pelvis_Angle@Release" and component_z_element is not None:
                                    Pelvis_Ang_Rel = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Trunk_Angle@Footstrike" and component_z_element is not None:
                                    trunk_ang_fp = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Trunk_Angle@Max_Shoulder_Rot" and component_z_element is not None:
                                    Trunk_Ang_MER = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Trunk_Angle@Release" and component_z_element is not None:
                                    Trunk_Ang_Rel = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Lead_Knee_Angle@Footstrike" and component_x_element is not None:
                                    lead_knee_ang_at_footstrike = float(
                                        component_x_element.attrib['data'].replace(',', '.'))
                                    lead_knee_ang_at_release = float(root.find(
                                        './/name[@value="Lead_Knee_Angle@Release"]/component[@value="X"]').attrib[
                                                                         'data'].replace(',', '.'))
                                    front_leg_brace = lead_knee_ang_at_footstrike - lead_knee_ang_at_release
                                if variable_name == "Lead_Knee_Angle@Footstrike" and component_y_element is not None:
                                    lead_knee_var_val_fp = float(component_y_element.attrib['data'].replace(',', '.'))
                                if variable_name == "Lead_Knee_Angle@Max_Shoulder_Rot" and component_x_element is not None:
                                    Front_Leg_MER = float(component_x_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Lead_Knee_Angle@Release" and component_y_element is not None:
                                    lead_knee_var_val_rel = float(component_y_element.attrib['data'].replace(',', '.'))
                                    # Calculate the difference and store in front_leg_var_val
                                    front_leg_var_val = lead_knee_var_val_fp - lead_knee_var_val_rel
                                if variable_name == "Pelvis_Angle@Footstrike" and component_y_element is not None:
                                    pelvis_obl_fp = float(component_y_element.attrib['data'].replace(',', '.'))
                                    pelvis_angle_release_element = root.find(
                                        './/name[@value="Pelvis_Angle@Release"]/component[@value="Y"]')
                                    if pelvis_angle_release_element is not None:
                                        pelvis_obl_release = float(
                                            pelvis_angle_release_element.attrib['data'].replace(',', '.'))
                                        pelvis_obl = pelvis_obl_release - pelvis_obl_fp
                                elif variable_name == "Lead_Leg_GRF_mag_Midpoint_FS_Release" and component_x_element is not None:
                                    lead_leg_midpoint = abs(float(component_x_element.attrib['data'].replace(',', '.')))
                                elif variable_name == "Lead_Leg_GRF_min" and component_y_element is not None:
                                    lead_leg_grf_y = abs(float(component_y_element.attrib['data'].replace(',', '.')))
                                elif variable_name == "Lead_Leg_GRF_max" and component_z_element is not None:
                                    lead_leg_grf_z = float(component_z_element.attrib['data'].replace(',', '.'))
                                if variable_name == "Lead_Leg_GRF_max" and component_x_element is not None:
                                    lat_force_max = float(component_x_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Lead_Leg_GRF_min" and component_x_element is not None:
                                    lat_force_min = float(component_x_element.attrib['data'].replace(',', '.'))
                                    # Calculate the sum of absolute values and store in lead_leg_grf_x
                                    lead_leg_grf_x = abs(lat_force_max) + abs(lat_force_min)
                                elif variable_name == "Pitching_Shoulder_Angle@Footstrike" and component_x_element is not None:
                                    horizontal_abduction = abs(
                                        float(component_x_element.attrib['data'].replace(',', '.')))
                                if variable_name == "Pitching_Shoulder_Angle@Footstrike":
                                    if component_z_element is not None:
                                        shld_er_fp = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pitching_Shoulder_Angle_Max" and component_z_element is not None:
                                    shld_er_max = abs(float(component_z_element.attrib['data'].replace(',', '.')))
                                elif variable_name == "Pitching_Shoulder_Angle_Min" and component_x_element is not None:
                                    Abduction_Max = abs(float(component_x_element.attrib['data'].replace(',', '.')))
                                elif variable_name == "Trunk_wrt_Pelvis_FE@Release" and component_y_element is not None:
                                    lateral_trunk_tilt = float(component_y_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pelvis_Ang_Vel_max" and component_x_element is not None:
                                    pelvis_ang_velo = float(component_x_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Thorax_Ang_Vel_max" and component_x_element is not None:
                                    torso_ang_velo = float(component_x_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pitching_Hand_Ang_Vel_max" and component_x_element is not None:
                                    Hand_Ang_Velo = float(component_x_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pitching_Humerus_Ang_Vel_max" and component_x_element is not None:
                                    arm_ang_velo = float(component_x_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pitching_Shoulder_Angle_Max" and component_z_element is not None:
                                    shld_er_max = abs(float(component_z_element.attrib['data'].replace(',', '.')))
                                elif variable_name == "STRIDE_LENGTH" and component_x_element is not None:
                                    Stride_Length = abs(float(component_x_element.attrib['data'].replace(',', '.')))

                                linear_pelvis_speed = linear_pelvis_speed if linear_pelvis_speed is not None else 4
                                hss_footplant = hss_footplant if hss_footplant is not None else 30
                                pelvis_ang_fp = pelvis_ang_fp if pelvis_ang_fp is not None else 60
                                trunk_ang_fp = trunk_ang_fp if trunk_ang_fp is not None else 90
                                pelvis_obl = pelvis_obl if pelvis_obl is not None else 2
                                front_leg_brace = front_leg_brace if front_leg_brace is not None else 8
                                front_leg_var_val = front_leg_var_val if front_leg_var_val is not None else 0
                                lead_leg_midpoint = lead_leg_midpoint if lead_leg_midpoint is not None else 1.5
                                lead_leg_grf_y = lead_leg_grf_y if lead_leg_grf_y is not None else .7
                                lead_leg_grf_z = lead_leg_grf_z if lead_leg_grf_z is not None else 1.5
                                lead_leg_grf_x = lead_leg_grf_x if lead_leg_grf_x is not None else .25
                                horizontal_abduction = horizontal_abduction if horizontal_abduction is not None else 20
                                shld_er_fp = shld_er_fp if shld_er_fp is not None else 45
                                lateral_trunk_tilt = lateral_trunk_tilt if lateral_trunk_tilt is not None else 35
                                shld_er_max = shld_er_max if shld_er_max is not None else 160
                                pelvis_ang_velo = pelvis_ang_velo if pelvis_ang_velo is not None else 600
                                torso_ang_velo = torso_ang_velo if torso_ang_velo is not None else 1000
                                arm_ang_velo = arm_ang_velo if arm_ang_velo is not None else 5000

                            # Insert the data into the database
                            cursor.execute('''
                               INSERT INTO variables (
                                   session_data_id,
                                   file_name,
                                   Pitch,
                                   Linear_Pelvis_Speed,
                                   HSS_Footplant,
                                   Pelvis_Ang_Footplant,
                                   Trunk_Ang_Footplant,
                                   Pelvic_Obl,
                                   Front_Leg_Brace,
                                   Front_Leg_Var_Val,
                                   Lead_Leg_Midpoint,
                                   Lead_Leg_GRF_y,
                                   Lead_Leg_GRF_z,
                                   Lead_Leg_GRF_x,
                                   Horizontal_Abduction,
                                   Shld_ER_Footplant,
                                   Shld_ER_Max,
                                   Lateral_Trunk_Tilt,
                                   Pelvis_Ang_Velo,
                                   Torso_Ang_Velo,
                                   Arm_Ang_Velo,
                                   MPH,
                                   Trunk_Ang_MER,
                                   Trunk_Ang_Rel,
                                   Pelvis_Ang_MER,
                                   Pelvis_Ang_Rel,
                                   HSS_MER,
                                   HSS_Rel,
                                   Front_Leg_Footplant,
                                   Front_Leg_MER,
                                   Front_Leg_Rel,
                                   Abduction_Max,
                                   Hand_Ang_Velo,
                                   Stride_Length,
                                   Arm_Slot,
                                   Weight
                               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                           ''', (
                                session_data_id, file_name, pitch_value, linear_pelvis_speed, hss_footplant,
                                pelvis_ang_fp,
                                trunk_ang_fp, pelvis_obl, front_leg_brace, front_leg_var_val, lead_leg_midpoint,
                                lead_leg_grf_y,
                                lead_leg_grf_z, lead_leg_grf_x, horizontal_abduction, shld_er_fp, shld_er_max,
                                lateral_trunk_tilt, pelvis_ang_velo, torso_ang_velo, arm_ang_velo, None, Trunk_Ang_MER,
                                Trunk_Ang_Rel, Pelvis_Ang_MER, Pelvis_Ang_Rel, HSS_MER, HSS_Rel,
                                lead_knee_ang_at_footstrike, Front_Leg_MER, lead_knee_ang_at_release, Abduction_Max,
                                Hand_Ang_Velo, Stride_Length, Arm_Slot, Weight))

                            # Increment the count of new data entries
                            new_data_entries += 1
                else:
                    print(f"Skipping file {file_name} due to missing session_data_id.")

        except Exception as e:
            # Print the error and the file name where it occurred
            print(f"Error processing file {file_name}: {e}")

    # Commit the changes for each file
    conn.commit()

    # If no new data entries, break out of the loop
    if new_data_entries == 0:
        break

# Close the connection
conn.close()

print("Data inserted into the database.")

# Successfully adds MPH to the appropriate spot in the database

# Connect to the database
conn = sqlite3.connect("grading_equation_reference_data_All.db")
cursor = conn.cursor()

directory_path = r"C:\Users\q\PycharmProjects\Rename_Session.xml\Pitching Data\MPH Data\All"

# Get a list of XML files in the specified directory
xml_files = [os.path.join(directory_path, file) for file in os.listdir(directory_path) if file.endswith(".xml")]

# Track the number of new data entries
new_data_entries = 0

# Parse the XML files
for file_name in xml_files:
    try:
        # Check if the file has already been processed
        cursor.execute('SELECT COUNT(*) FROM variables WHERE file_name = ?', (file_name,))
        count = cursor.fetchone()[0]

        if count == 0:
            # Parse the XML file
            tree = ET.parse(file_name)
            root = tree.getroot()

            # Extract session_data_id from the file name
            session_data_id_match = re.search(r"session_(.+)\.xml", file_name)
            if session_data_id_match:
                session_data_id = session_data_id_match.group(1)
            else:
                session_data_id = None

            # Check if session_data_id is None, and skip the file if it is
            if session_data_id is not None:
                # Extract Weight
                weight_element = root.find('./Fields/Weight')
                weight = float(weight_element.text) if weight_element is not None else None

                # Iterate over all occurrences of "Measurement" element
                for measurement_element in root.findall('.//Measurement'):
                    pitch_value = measurement_element.get('Filename')
                    used_element = measurement_element.find('./Fields/Used')

                    if pitch_value is not None and used_element is not None:
                        # Replace "qtm" with "c3d" in pitch_value
                        pitch_value = pitch_value.replace("qtm", "c3d")

                        # Print statement for debugging
                        print(f"Filename: {pitch_value}, Used: {used_element.text}")

                        if 'Fastball' in pitch_value and used_element.text == 'True':
                            # Extract the values of "Comments" (MPH)
                            comments_value_element = measurement_element.find('./Fields/Comments')

                            mph_value = None
                            if comments_value_element is not None:
                                mph_value = float(comments_value_element.text)
                                print(f"MPH: {mph_value}, Weight: {weight}, Session ID: {session_data_id}")

                            # Update the MPH and Weight values in the "variables" table
                            cursor.execute('''
                                UPDATE variables
                                SET MPH = ?, Weight = ?
                                WHERE session_data_id = ? AND Pitch = ?
                            ''', (mph_value, weight, session_data_id, pitch_value))

                            # Increment the new data entries counter
                            new_data_entries += 1
                    else:
                        print("Filename or Used element not found.")

    except Exception as e:
        print(f"Error processing file {file_name}: {e}")

# Commit the changes
conn.commit()

cursor.execute('SELECT id, Weight, Lead_Leg_Midpoint, Lead_Leg_GRF_y, Lead_Leg_GRF_z, Lead_Leg_GRF_x FROM variables')
rows = cursor.fetchall()

for row in rows:
    id, weight, midpoint, grf_y, grf_z, grf_x = row

    # Set Weight to 195 if it is None
    if weight is None or weight <= 0:
        weight = 88

    # Calculate the adjustment factor based on Weight
    adjustment_factor = weight * 9.81

    # Adjust values if they are above 4
    if midpoint and midpoint > 4:
        midpoint /= adjustment_factor
    if grf_y and grf_y > 4:
        grf_y /= adjustment_factor
    if grf_z and grf_z > 4:
        grf_z /= adjustment_factor
    if grf_x and grf_x > 4:
        grf_x /= adjustment_factor

    # Update the database with the adjusted values
    cursor.execute('''
        UPDATE variables
        SET Lead_Leg_Midpoint = ?, Lead_Leg_GRF_y = ?, Lead_Leg_GRF_z = ?, Lead_Leg_GRF_x = ?, Weight = ?
        WHERE id = ?
    ''', (midpoint, grf_y, grf_z, grf_x, weight, id))

# Commit the adjusted values
conn.commit()

print("Ground reaction forces adjusted based on Weight.")

# Close the connection
conn.close()

print(f"Number of new data entries: {new_data_entries}")
print("Data inserted into the database.")

# Generates Score


# Connect to the SQLite database
conn = sqlite3.connect("grading_equation_reference_data_All.db")
cursor = conn.cursor()

# Select all rows from the 'variables' table
cursor.execute('SELECT * FROM variables')
rows = cursor.fetchall()

# Iterate through each row and calculate the score
for row in rows:
    linear_pelvis_speed = row[5]
    hss_footplant = row[6]
    pelvis_ang_fp = row[7]
    trunk_ang_fp = row[8]
    pelvis_obl = row[9]
    front_leg_brace = row[10]
    front_leg_var_val = row[11]
    lead_leg_midpoint = row[12]
    lead_leg_grf_y = row[13]
    lead_leg_grf_z = row[14]
    lead_leg_grf_x = row[15]
    horizontal_abduction = row[16]
    shld_er_fp = row[17]
    shld_er_max = row[18]
    lateral_trunk_tilt = row[19]
    pelvis_ang_velo = row[20]
    torso_ang_velo = row[21]
    arm_ang_velo = row[22]
    MPH = row[23]

    # Check for None values and replace with 0
    linear_pelvis_speed = linear_pelvis_speed if linear_pelvis_speed is not None else 4
    hss_footplant = hss_footplant if hss_footplant is not None else 30
    pelvis_ang_fp = pelvis_ang_fp if pelvis_ang_fp is not None else 60
    trunk_ang_fp = trunk_ang_fp if trunk_ang_fp is not None else 90
    pelvis_obl = pelvis_obl if pelvis_obl is not None else 2
    front_leg_brace = front_leg_brace if front_leg_brace is not None else 8
    front_leg_var_val = front_leg_var_val if front_leg_var_val is not None else 0
    lead_leg_midpoint = lead_leg_midpoint if lead_leg_midpoint is not None else 2
    lead_leg_grf_y = lead_leg_grf_y if lead_leg_grf_y is not None else .7
    lead_leg_grf_z = lead_leg_grf_z if lead_leg_grf_z is not None else 1.5
    lead_leg_grf_x = lead_leg_grf_x if lead_leg_grf_x is not None else .25
    horizontal_abduction = horizontal_abduction if horizontal_abduction is not None else 20
    shld_er_fp = shld_er_fp if shld_er_fp is not None else 45
    lateral_trunk_tilt = lateral_trunk_tilt if lateral_trunk_tilt is not None else 35
    shld_er_max = shld_er_max if shld_er_max is not None else 160
    pelvis_ang_velo = pelvis_ang_velo if pelvis_ang_velo is not None else 600
    torso_ang_velo = torso_ang_velo if torso_ang_velo is not None else 1000
    arm_ang_velo = arm_ang_velo if arm_ang_velo is not None else 5000
    MPH = MPH if MPH is not None else 75

    # Calculate the score using the specified equation
    score = (0.05 * linear_pelvis_speed) + (0.15 * front_leg_brace) + \
            (5 * lead_leg_midpoint) + \
            (0.55 * horizontal_abduction) + (0.012 * torso_ang_velo) + (.05 * pelvis_obl) + (
                        .6 * trunk_ang_fp) - (.45 * pelvis_ang_fp) + (.1 * shld_er_max) + (.1 * front_leg_var_val) + (
                        .05 * pelvis_ang_velo) + MPH

    # Update the 'Score' column in the database
    cursor.execute('UPDATE variables SET Score = ? WHERE id = ?', (score, row[0]))

# Commit the changes and close the connection
conn.commit()
conn.close()

print("Scores updated in the database.")
