'''
   File to parse the EEBO CSV and create a dummy JSON object for
   prototyping
'''
import pandas as pd
from stemming.porter2 import stem
from difflib import SequenceMatcher
from flask import Flask, request, redirect, url_for, render_template, flash, json
import json

from mock_place import MockService
from combined import JoinGraph
from search import SearchData

app = Flask(__name__)

@app.route('/data')
def get_single_data():
    #change this Arnaud in JS
    text = pd.read_csv('/home/iain/git/Texts/TCP.csv')
    text = text.loc[text['Author'].str.contains("Lindanus, Guilelmus Damasus",na=False)]
    response = app.response_class(
        response=text.to_json(orient='records'),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/search')
def search_data():
    search = request.args.get('term')
    #search = request.values
    print(search)
    data = SearchData('http://129.67.193.130:10080/blazegraph/sparql').search_data(search)
    return response_template(data, 200)

@app.route('/')
def get_index():
    return render_template('search.html')

@app.route('/book')
def get_single():
    return render_template('index.html')

@app.route('/stem', methods=['POST'])
def stem():
    '''
       Code to stem the words. 
    '''
    term = request.get_json()
    _term = stem(term)
    #write function to search the turtle for languages that have the stem in it. 
    return response

@app.route('/geo', methods=['POST'])
def sparql():
    '''
       Code to stem the words. 
    '''
    term = request.get_json()
    _term = MockService('place').run_query(term["term"])
    print _term
    #write function to search the turtle for languages that have the stem in it. 
    response = app.response_class(
        response=json.dumps({'linked':_term}),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/distance', methods=['POST'])
def distance():
    terms = request.get_json()
    match = SequenceMatcher(None, terms["a"], terms["b"])
    response = app.response_class(
        response=json.dumps({'result': str(match.ratio())}),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/links', methods=['GET', 'POST'])
def get_linked_graphs():
    graph = request.get_json()
    data = JoinGraph('http://129.67.193.130:10080/blazegraph/sparql').join_graphs(graph['graph'])
    return response_template(data, 200)

@app.route('/weight', methods=['POST'])
def store_weight():
    weight = request.get_json()
    return response_template("stored", 200)
    

def response_template(data, resp_status):
    '''
       Helper function for the JSON response template
    '''
    response = app.response_class(
        response=data,
        status=resp_status,
        mimetype='application/json'
    )
    return response
