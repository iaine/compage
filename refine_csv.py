'''
   File to parse the EEBO CSV and create a dummy JSON object for
   prototyping
'''
import pandas as pd

text = pd.read_csv('/home/iain/git/Texts/TCP.csv')
#text = text.loc[text['Title'].str.contains("Lewys Euans",na=False)]
text = text.loc[text['Terms'].str.contains("Catholic Church",na=False)]
text = text.loc[text['Terms'].str.contains("Controversial literature",na=False)]
for t in text['Title']:
    _tmp = t.split('--')
    
