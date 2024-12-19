import dash
from dash import html, dcc, Input, Output, State
import pandas as pd
import re
import io

# Initialize app
app = dash.Dash(__name__)

# Style for tables
TABLE_STYLE = {
    'border': '1px solid black',
    'borderCollapse': 'collapse',
    'fontFamily': 'Verdana, sans-serif',
    'fontSize': '14px',
    'textAlign': 'center',
    'position': 'absolute'
}

# Helper function to create a table
def create_table(rows, cols, col_widths, data):
    header_row = html.Tr([
        html.Th(col, style={'width': f"{col_width}px", 'height': '40px', 'fontWeight': 'normal', 'fontSize': '12px', 'padding': '4px'}) for col, col_width in zip(cols, col_widths)
    ])

    body_rows = [
        html.Tr([
            html.Td(data[i][j], style={'width': f"{col_widths[j]}px", 'height': '36px', 'padding': '4px', 'textAlign': 'right' if j == 0 else 'center'}) for j in range(len(cols))
        ]) for i in range(rows)
    ]

    return html.Table([
        html.Thead(header_row),
        html.Tbody(body_rows)
    ])

# Layout
app.layout = html.Div([
    # Background color layer
    html.Div(
        style={
            'backgroundColor': '#dfe0e0',
            'width': '100vw',
            'height': '100vh',
            'position': 'absolute',
            'zIndex': '-2'
        }
    ),

    # Background image layer
    html.Div(
        style={
            'position': 'absolute',
            'width': '1878.5px',
            'height': '748.5px',
            'left': '35.9px',
            'top': '173.5px',
            'backgroundImage': 'url(https://8ctanebaseball.com/wp-content/uploads/2024/02/cropped-8ctaneBaseballLogo-2.png)',
            'backgroundSize': 'contain',
            'backgroundRepeat': 'no-repeat',
            'opacity': '0.15',
            'zIndex': '-1'
        }
    ),

    # Name
    html.Div(
        "Zach Vennaro", style={
            'position': 'absolute',
            'left': '50%',
            'top': '40px',
            'transform': 'translateX(-50%)',
            'fontSize': '56px',
            'fontFamily': 'Verdana, sans-serif',
            'fontWeight': 'bold',
            'textAlign': 'center'
        }
    ),

    # Date
    html.Div(
        "Wednesday, October 16, 2024", style={
            'position': 'absolute',
            'left': '50%',
            'top': '120px',
            'transform': 'translateX(-50%)',
            'fontSize': '18px',
            'fontFamily': 'Verdana, sans-serif',
            'textAlign': 'center'
        }
    ),

    # Lead Leg Flexion Table
    html.Div([
        html.H4("Lead Leg Flexion", style={'textAlign': 'center', 'marginBottom': '-33px', 'fontFamily': 'Verdana, sans-serif'}),
        create_table(3, ["", "", "Percentile"], [169, 69, 69], [["Foot Plant", "", ""], ["Max External Rotation", "", ""], ["Release", "", ""]])
    ], style={'position': 'absolute', 'left': '79px', 'top': '150px'}),

    # Trunk Position Table
    html.Div([
        html.H4("Trunk Position", style={'textAlign': 'center', 'marginBottom': '-33px', 'fontFamily': 'Verdana, sans-serif'}),
        create_table(3, ["", "", "Percentile"], [169, 69, 69], [["Counter Rotation at FP", "", ""], ["Max External Rotation", "", ""], ["Lateral Tilt at Release", "", ""]])
    ], style={'position': 'absolute', 'left': '79px', 'top': '360px'}),

    # Pelvis Rotation Table
    html.Div([
        html.H4("Pelvis Rotation", style={'textAlign': 'center', 'marginBottom': '-33px', 'fontFamily': 'Verdana, sans-serif'}),
        create_table(3, ["", "", "Percentile"], [169, 69, 69], [["Position at Foot Plant", "", ""], ["Max External Rotation", "", ""], ["Release", "", ""]])
    ], style={'position': 'absolute', 'left': '79px', 'top': '570px'}),

    # Hip-Shoulder Separation Table
    html.Div([
        html.H4("Hip-Shoulder Separation", style={'textAlign': 'left', 'marginBottom': '-33px', 'fontFamily': 'Verdana, sans-serif'}),
        create_table(3, ["", "", "Percentile"], [169, 69, 69], [["Foot Plant", "", ""], ["Max External Rotation", "", ""], ["Release", "", ""]])
    ], style={'position': 'absolute', 'left': '79px', 'top': '780px'}),

    # Shoulder ER Table
    html.Div([
        html.H4("Shoulder ER", style={'textAlign': 'center', 'marginBottom': '-33px', 'fontFamily': 'Verdana, sans-serif'}),
        create_table(2, ["", "", "Percentile"], [169, 69, 69], [["External Rotation at FP", "", ""], ["Max External Rotation", "", ""]])
    ], style={'position': 'absolute', 'left': '615px', 'top': '828px'}),

    # Abduction Table
    html.Div([
        html.H4("Abduction", style={'textAlign': 'center', 'marginBottom': '-33px', 'fontFamily': 'Verdana, sans-serif'}),
        create_table(2, ["", "", "Percentile"], [169, 69, 69], [["Horizontal Abduction", "", ""], ["Max External Rotation", "", ""]])
    ], style={'position': 'absolute', 'left': '1112px', 'top': '828px'}),

    # Kinematic Sequence Table
    html.Div([
        html.H4("Kinematic Sequence", style={'textAlign': 'center', 'marginBottom': '-33px', 'fontFamily': 'Verdana, sans-serif'}),
        create_table(4, ["", "", "Percentile"], [169, 69, 69], [["Arm Angular Velo", "", ""], ["Hand Angular Velo", "", ""], ["Pelvis Angular Velo", "", ""], ["Torso Angular Velo", "", ""]])
    ], style={'position': 'absolute', 'left': '1592px', 'top': '248px'}),

    # Trackman Metrics Table
    html.Div([
        html.H4("Trackman Metrics", style={'textAlign': 'center', 'marginBottom': '-13px', 'fontFamily': 'Verdana, sans-serif'}),
        create_table(8, ["", "Average", "Max"], [169, 69, 69], [["Velocity", "", ""], ["Spin Rate", "", ""], ["Horizontal Break", "", ""], ["Induced Vertical Break", "", ""], ["Release Height", "", ""], ["Release Side", "", ""], ["VAA", "", ""], ["HAA", "", ""]])
    ], style={'position': 'absolute', 'left': '1592px', 'top': '518px'}),

    # Score Table
    html.Div([
        html.Table([
            html.Tbody([
                html.Tr([
                    html.Td("Score", style={'fontWeight': 'bold', 'fontSize': '24px', 'fontFamily': 'Verdana, sans-serif', 'textAlign': 'center', 'width': '169px', 'height': '36px', 'padding': '4px'}),
                    html.Td("207", style={'fontWeight': 'bold', 'fontSize': '24px', 'fontFamily': 'Verdana, sans-serif', 'textAlign': 'center', 'width': '69px', 'height': '36px', 'padding': '4px'})
                ]),
                html.Tr([
                    html.Td("Percentile", style={'textAlign': 'center', 'fontFamily': 'Verdana, sans-serif', 'width': '169px', 'height': '36px', 'padding': '4px'}),
                    html.Td("", style={'textAlign': 'center', 'fontFamily': 'Verdana, sans-serif', 'width': '69px', 'height': '36px', 'padding': '4px'})
                ])
            ])
        ])
    ], style={'position': 'absolute', 'left': '893px', 'top': '668px'})
])

if __name__ == '__main__':
    app.run_server(debug=True)

