'''
    DAO for remote Sparql
'''
from SPARQLWrapper import SPARQLWrapper, JSON
from collections import defaultdict

class SparqlDao:
    '''
       class contains wrapper methods for the Sparql queries
    '''
    def run_remote_sparql(self,endpoint, query):
        '''
           Method to run remote Sparql queries
        '''
        data = []

        sparql = SPARQLWrapper(endpoint)
        sparql.method='POST'
        sparql.setQuery(query)
        sparql.setReturnFormat(JSON)
        results = sparql.query().convert()

        data = [(r["s"]["value"], r["p"]["value"], r["o"]["value"]) for r in results["results"]["bindings"]]

        return data

    def similarity_sparql(self,endpoint, query):
        '''
           Method to run remote Sparql queries
        '''
        data = defaultdict(list)

        sparql = SPARQLWrapper(endpoint)
        sparql.method='POST'
        sparql.setQuery(query)
        sparql.setReturnFormat(JSON)
        results = sparql.query().convert()
 
        for r in results["results"]["bindings"]:
            data[r["s"]["value"]].append((r["p"]["value"], r["o"]["value"]))

        return data

    def autocomplete_sparql(self,endpoint, query):
        '''
           Method for autocomplete sparql
        '''
        data = []

        sparql = SPARQLWrapper(endpoint)
        sparql.method='POST'
        sparql.setQuery(query)
        sparql.setReturnFormat(JSON)
        results = sparql.query().convert()

        data = [(r["s"]["value"], r["o"]["value"]) for r in results["results"]["bindings"]]

        return data

    def list_sparql(self,endpoint, query):
        '''
           Method for return a single list
        '''
        data = []

        sparql = SPARQLWrapper(endpoint)
        sparql.method='POST'
        sparql.setQuery(query)
        sparql.setReturnFormat(JSON)
        results = sparql.query().convert()

        data = [(r["s"]["value"]) for r in results["results"]["bindings"]]

        return data
