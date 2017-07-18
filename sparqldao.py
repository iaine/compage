'''
    DAO for remote Sparql
'''
from SPARQLWrapper import SPARQLWrapper, JSON

class SparqlDao:
    def run_remote_sparql(self,endpoint, query):
        data = []

        sparql = SPARQLWrapper(endpoint)

        sparql.setQuery(query)
        sparql.setReturnFormat(JSON)
        results = sparql.query().convert()

        data = [(r["s"]["value"], r["p"]["value"], r["o"]["value"]) for r in results["results"]["bindings"]]

        return data
