# Pull the data from the Google Drive and Move it to the folder 'New Data'


import os
import shutil
import sqlite3
import xml.etree.ElementTree as ET
import re
import scipy.stats as stats
import matplotlib.pyplot as plt
from docx import Document
from matplotlib.backends.backend_pdf import PdfPages
import datetime
import shutil
import tkinter as tk
from tkinter import filedialog


def select_folder():
    root = tk.Tk()
    root.withdraw()  # Hide the main window

    folder_path = filedialog.askdirectory(initialdir=r"H:\Pitching\Data", title="Select Folder")
    if folder_path:
        copy_and_move_files(folder_path)


def extract_initials(folder_name):
    initials = ''.join(filter(str.isupper, folder_name))
    return initials[::-1]  # Reverse the initials


def copy_and_move_files(base_path):
    # Get the base folder name
    base_folder = os.path.basename(base_path)

    # Get list of folders in the base path
    folders = [f for f in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, f))]
    # Sort folders by creation time
    folders.sort(key=lambda x: os.path.getctime(os.path.join(base_path, x)), reverse=True)

    if not folders:
        print("No folders found in the specified directory.")
        return

    latest_folder = folders[0]
    folder_path = os.path.join(base_path, latest_folder)

    # Get creation time of the latest folder
    creation_time = os.path.getctime(folder_path)
    creation_date = datetime.datetime.fromtimestamp(creation_time).strftime('%m-%d-%y')

    # Find the files to copy and rename
    files_to_copy_rename = []
    for file in os.listdir(folder_path):
        if file.lower() == 'session.xml' or file.lower() == 'session_data.xml':
            files_to_copy_rename.append(file)

    if not files_to_copy_rename:
        print("No XML files named 'session.xml' or 'session_data.xml' found in the latest folder.")
        return

    # Construct new file names
    new_file_names = []
    initials = extract_initials(base_folder)
    for file in files_to_copy_rename:
        if file.lower() == 'session.xml':
            new_file_name = f"session_{initials}_{creation_date}.xml"
        elif file.lower() == 'session_data.xml':
            new_file_name = f"session_data_{initials}_{creation_date}.xml"
        else:
            continue
        new_file_names.append(new_file_name)

    # Create temporary directory to store renamed copies
    temp_dir = os.path.join(base_path, "temp_rename")
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)

    # Copy and rename the files to the temporary directory
    for original_file, new_file_name in zip(files_to_copy_rename, new_file_names):
        original_file_path = os.path.join(folder_path, original_file)
        new_file_path = os.path.join(temp_dir, new_file_name)
        shutil.copyfile(original_file_path, new_file_path)
        print(f"File '{original_file}' copied and renamed to: {new_file_path}")

    # Copy the renamed files to the destination folder
    new_folder_path = r"F:\My Drive\Pitching Data\New Data"
    if not os.path.exists(new_folder_path):
        os.makedirs(new_folder_path)
    for new_file_name in new_file_names:
        temp_file_path = os.path.join(temp_dir, new_file_name)
        destination_file_path = os.path.join(new_folder_path, new_file_name)
        shutil.copyfile(temp_file_path, destination_file_path)
        print(f"File '{new_file_name}' copied to: {destination_file_path}")

    # Clean up temporary directory
    shutil.rmtree(temp_dir)


# Prompt user to select the folder
select_folder()


# Source and destination directory paths
source_dir = r"F:\My Drive\Pitching Data\New Data"
destination_dir = r"C:\Users\q\PycharmProjects\Rename_Session.xml\Pitching Data\New Data"

# Iterate over files in the source directory
for file_name in os.listdir(source_dir):
    if file_name.endswith('.xml'):
        source_file_path = os.path.join(source_dir, file_name)
        destination_file_path = os.path.join(destination_dir, file_name)
        shutil.move(source_file_path, destination_file_path)
        print(f"File '{file_name}' moved to: {destination_file_path}")

print("XML files copied successfully!")

# This code is *chef's kiss* perfect. Does everything for parsing for variables, iterates over it
# multiple times, and includes the specific filename for each trial. I love it.


# Connect to the SQLite database
conn = sqlite3.connect("grading_equation_new.db")
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
       MPH REAL
   )
''')

# Commit the changes before proceeding to parsing XML files
conn.commit()

# List of XML files to parse (replace this with your actual directory path)
directory_path = r"C:\Users\q\PycharmProjects\Rename_Session.xml\Pitching Data\New Data"

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
                                elif variable_name == "Pelvis_Angle@Footstrike" and component_z_element is not None:
                                    pelvis_ang_fp = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Trunk_Angle@Footstrike" and component_z_element is not None:
                                    trunk_ang_fp = float(component_z_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Lead_Knee_Angle@Footstrike" and component_x_element is not None:
                                    lead_knee_ang_at_footstrike = float(
                                        component_x_element.attrib['data'].replace(',', '.'))
                                    lead_knee_ang_at_release = float(root.find(
                                        './/name[@value="Lead_Knee_Angle@Release"]/component[@value="X"]').attrib[
                                                                         'data'].replace(',', '.'))
                                    front_leg_brace = lead_knee_ang_at_footstrike - lead_knee_ang_at_release
                                if variable_name == "Lead_Knee_Angle@Footstrike" and component_y_element is not None:
                                    lead_knee_var_val_fp = float(component_y_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Lead_Knee_Angle@Release" and component_y_element is not None:
                                    lead_knee_var_val_rel = float(component_y_element.attrib['data'].replace(',', '.'))
                                    # Calculate the difference and store in front_leg_var_val
                                    front_leg_var_val = lead_knee_var_val_fp - lead_knee_var_val_rel
                                if variable_name == "Pelvis_Angle@Footstrike" and component_z_element is not None:
                                    pelvis_obl_fp = float(component_y_element.attrib['data'].replace(',', '.'))
                                    pelvis_angle_release_element = root.find(
                                        './/name[@value="Pelvis_Angle@Release"]/component[@value="Y"]')
                                    if pelvis_angle_release_element is not None:
                                        pelvis_obl_release = float(
                                            pelvis_angle_release_element.attrib['data'].replace(',', '.'))
                                        pelvis_obl = pelvis_obl_release - pelvis_obl_fp
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
                                elif variable_name == "Trunk_wrt_Pelvis_FE@Release" and component_y_element is not None:
                                    lateral_trunk_tilt = float(component_y_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pelvis_Ang_Vel_max" and component_x_element is not None:
                                    pelvis_ang_velo = float(component_x_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Thorax_Ang_Vel_max" and component_x_element is not None:
                                    torso_ang_velo = float(component_x_element.attrib['data'].replace(',', '.'))
                                elif variable_name == "Pitching_Humerus_Ang_Vel_max" and component_x_element is not None:
                                    arm_ang_velo = float(component_x_element.attrib['data'].replace(',', '.'))

                                linear_pelvis_speed = linear_pelvis_speed if linear_pelvis_speed is not None else 4
                                hss_footplant = hss_footplant if hss_footplant is not None else 30
                                pelvis_ang_fp = pelvis_ang_fp if pelvis_ang_fp is not None else 60
                                trunk_ang_fp = trunk_ang_fp if trunk_ang_fp is not None else 90
                                pelvis_obl = pelvis_obl if pelvis_obl is not None else 2
                                front_leg_brace = front_leg_brace if front_leg_brace is not None else 8
                                front_leg_var_val = front_leg_var_val if front_leg_var_val is not None else 0
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
                                   MPH
                               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                           ''', (
                            session_data_id, file_name, pitch_value, linear_pelvis_speed, hss_footplant, pelvis_ang_fp,
                            trunk_ang_fp, pelvis_obl, front_leg_brace, front_leg_var_val, lead_leg_grf_y,
                            lead_leg_grf_z, lead_leg_grf_x, horizontal_abduction, shld_er_fp, shld_er_max,
                            lateral_trunk_tilt, pelvis_ang_velo, torso_ang_velo, arm_ang_velo, None))

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
conn = sqlite3.connect("grading_equation_new.db")
cursor = conn.cursor()

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
            session_data_id_match = re.search(r"session_(.+)\.xml", file_name)
            if session_data_id_match:
                session_data_id = session_data_id_match.group(1)
            else:
                session_data_id = None

            # Check if session_data_id is None, and skip the file if it is
            if session_data_id is not None:
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
                            # Extract the values of "Comments" and "Ball_speed"
                            comments_value_element = measurement_element.find('./Fields/Comments')

                            if comments_value_element is not None:
                                print(f"MPH: {comments_value_element.text}")
                                print(f"Session ID: {session_data_id}")

                                mph_value = float(comments_value_element.text)

                                # Update the MPH value in the "variables" table
                                cursor.execute('''
                                   UPDATE variables
                                   SET MPH = ?
                                   WHERE session_data_id = ? AND Pitch = ?
                               ''', (mph_value, session_data_id, pitch_value))

                                # Increment the new data entries counter
                                new_data_entries += 1
                    else:
                        print("Filename or Used element not found.")

    except Exception as e:
        print(f"Error processing file {file_name}: {e}")

# Commit the changes
conn.commit()

# Close the connection
conn.close()

print(f"Number of new data entries: {new_data_entries}")
print("Data inserted into the database.")

# Generates Score


# Connect to the SQLite database
conn = sqlite3.connect("grading_equation_new.db")
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
    lead_leg_grf_y = row[12]
    lead_leg_grf_z = row[13]
    lead_leg_grf_x = row[14]
    horizontal_abduction = row[15]
    shld_er_fp = row[16]
    shld_er_max = row[17]
    lateral_trunk_tilt = row[18]
    pelvis_ang_velo = row[19]
    torso_ang_velo = row[20]
    arm_ang_velo = row[21]
    MPH = row[22]

    # Check for None values and replace with 0
    linear_pelvis_speed = linear_pelvis_speed if linear_pelvis_speed is not None else 4
    hss_footplant = hss_footplant if hss_footplant is not None else 30
    pelvis_ang_fp = pelvis_ang_fp if pelvis_ang_fp is not None else 60
    trunk_ang_fp = trunk_ang_fp if trunk_ang_fp is not None else 90
    pelvis_obl = pelvis_obl if pelvis_obl is not None else 2
    front_leg_brace = front_leg_brace if front_leg_brace is not None else 8
    front_leg_var_val = front_leg_var_val if front_leg_var_val is not None else 0
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
    score = (0.05 * linear_pelvis_speed) + (0.1 * front_leg_brace) + \
            (2 * lead_leg_grf_y) + (.05 * lead_leg_grf_z) + (2 * lead_leg_grf_x) + \
            (0.5 * horizontal_abduction) - (0.05 * lateral_trunk_tilt) + (0.01 * torso_ang_velo) + (.1 * pelvis_obl) + (
                        .2 * trunk_ang_fp) - (.15 * pelvis_ang_fp) + (.05 * shld_er_max) + (.1 * front_leg_var_val) + (
                        .01 * pelvis_ang_velo) + MPH

    # Update the 'Score' column in the database
    cursor.execute('UPDATE variables SET Score = ? WHERE id = ?', (score, row[0]))

# Commit the changes and close the connection
conn.commit()
conn.close()

print("Scores updated in the database.")

# Generates percentile graphs and exports both and PDF and Word Doc for the person


# Connect to the SQLite databases
conn_new = sqlite3.connect("grading_equation_new.db")
conn_reference = sqlite3.connect("grading_equation_reference_data_All.db")
cursor_new = conn_new.cursor()
cursor_reference = conn_reference.cursor()

# Define the directory to save exported graphs
export_dir = r"C:\Users\q\PycharmProjects\Rename_Session.xml\Pitching Data\Exported Data"

try:
    # Get the session_data_id for naming the Word document
    cursor_new.execute('SELECT session_data_id FROM variables LIMIT 1')
    session_data_id = cursor_new.fetchone()[0]

    # Define the filename for the Word document
    docx_filename = os.path.join(export_dir, f"8ctane Percentiles {session_data_id}.docx")

    # Create a Word document to save the plots
    doc = Document()

    # Create a PDF file to save the plots
    pdf_filename = os.path.join(export_dir, f"8ctane Percentiles {session_data_id}.pdf")
    pdf_pages = PdfPages(pdf_filename)

    # Get the list of columns in the new database
    cursor_new.execute("PRAGMA table_info(variables)")
    column_names = [row[1] for row in cursor_new.fetchall() if
                    row[1] not in ('id', 'session_data_id', 'file_name', 'Pitch')]

    # Retrieve the row with the highest score from the new database
    cursor_new.execute('SELECT * FROM variables ORDER BY Score DESC LIMIT 1')
    highest_score_row = cursor_new.fetchone()

    # Get the values from the highest scoring row
    highest_score_values = highest_score_row[4:]  # Exclude 'id', 'session_data_id', 'file_name', and 'Pitch'

    for i, column_name in enumerate(column_names):
        # Retrieve the reference values from the reference database
        cursor_reference.execute(f"SELECT {column_name} FROM variables")
        reference_values = cursor_reference.fetchall()
        reference_values = [value[0] for value in reference_values if value[0] is not None]

        # Calculate the percentile for the current variable
        percentile = stats.percentileofscore(reference_values, highest_score_values[i], kind='mean')

        # Create a new figure with black background
        fig = plt.figure(facecolor='#181818')

        # Create axes with charcoal background
        ax = fig.add_subplot(111, facecolor='#303030')

        # Adjust the size of the figure
        plt.subplots_adjust(bottom=0.2)  # Increase the bottom margin to create space for annotation

        # Create a histogram for the reference values with blue bars
        ax.hist(reference_values, bins=20, color='cornflowerblue', alpha=0.7, label='Reference Data')

        # Add a vertical line for the highest scoring value
        ax.axvline(x=highest_score_values[i], color='red', linestyle='dashed', linewidth=2, label='Highest Score')

        # Remove the words "Histogram of" from the title and replace underscores with spaces
        column_name_title = column_name.replace('_', ' ')
        ax.set_title(column_name_title.replace('Histogram of ', ''), color='lightgrey')

        # Add labels with white color
        ax.set_xlabel(column_name, color='slategrey')
        ax.set_ylabel('Frequency', color='slategrey')

        # Set the color of the gridlines
        ax.grid(color='dimgrey')

        # Set the color of ticks and spines
        ax.tick_params(axis='x', colors='dimgrey')
        ax.tick_params(axis='y', colors='dimgrey')
        ax.spines['bottom'].set_color('slategrey')
        ax.spines['top'].set_color('slategrey')
        ax.spines['left'].set_color('slategrey')
        ax.spines['right'].set_color('slategrey')

        # Add legend with white color
        ax.legend(facecolor='black', edgecolor='grey', prop={'size': 'small'}, labelcolor='grey')

        # Round the percentile score and the corresponding value
        rounded_percentile = round(percentile, 2)
        rounded_value = round(highest_score_values[i], 2)

        # Add annotation for percentile score and corresponding value
        ax.annotate(f'Percentile: {rounded_percentile}%\nValue: {rounded_value}',
                    xy=(highest_score_values[i], 0),
                    xytext=(1.0, -0.15),  # Adjusted position below x-axis label in bottom right
                    textcoords='axes fraction',  # Coordinates relative to axes
                    ha='right', va='top',  # Horizontal and vertical alignment
                    fontsize=12, color='white')

        # Create a histogram for the reference values with blue bars and borders
        ax.hist(reference_values, bins=20, color='cornflowerblue', alpha=0.7, label='Reference Data', edgecolor='black')

        # Remove underscores in the x-axis labels
        ax.set_xlabel(column_name.replace('_', ' '), color='slategrey')

        # Save the graph to a file (PNG)
        filename = os.path.join(export_dir, f'{column_name}.png')
        plt.savefig(filename)

        # Add the graph to the Word document
        doc.add_picture(filename)

        # Save the graph to the PDF
        pdf_pages.savefig(fig)

        # Clear the current figure to create a new one for the next variable
        plt.clf()

        print(f"Graph for {column_name} exported successfully.")

    # Close the PDF pages
    pdf_pages.close()

    # Save the Word document
    doc.save(docx_filename)

except sqlite3.Error as e:
    print("Error:", e)

finally:
    # Close the connections
    conn_new.close()
    conn_reference.close()

    # Source directory path
    source_dir = r"C:\Users\q\PycharmProjects\Rename_Session.xml\Pitching Data\New Data"

    # Destination directory paths
    kinematic_data_dir = r"C:\Users\q\PycharmProjects\Rename_Session.xml\Pitching Data\Kinematic Data\All"
    mph_data_dir = r"C:\Users\q\PycharmProjects\Rename_Session.xml\Pitching Data\MPH Data\All"

    # Iterate over files in the source directory
    for file_name in os.listdir(source_dir):
        if 'data' in file_name.lower():
            source_file_path = os.path.join(source_dir, file_name)
            destination_file_path = os.path.join(kinematic_data_dir, file_name)
            shutil.move(source_file_path, destination_file_path)
            print(f"File '{file_name}' moved to: {destination_file_path}")
        else:
            source_file_path = os.path.join(source_dir, file_name)
            destination_file_path = os.path.join(mph_data_dir, file_name)
            shutil.move(source_file_path, destination_file_path)
            print(f"File '{file_name}' moved to: {destination_file_path}")

    print("Files moved successfully!")
