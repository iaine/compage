'''
   Mock place gazeteer service
'''
from rdflib import Graph

class MockService():
    def __init__(self, mocktype):
        '''
          Initialise the data
        '''
        self.g = Graph()
        if mocktype == "place":
            self.turtle = "place.ttl"
        else:
            self.turtle = "names.ttl"

    def load_graph(self):
        '''
           Loading the graph
        '''
        self.g.load(self.turtle, format="turtle")

    def query(self, search_term):
        '''
           Query the file
        '''
        sparql = "PREFIX skos:<http://www.w3.org/2004/02/skos/core#> \
SELECT?pref WHERE {{?gr skos:prefLabel ?pref . ?gr skos:altLabel ?alt . filter(regex(?alt, \" {0}\", \"i\")) . }}".format(search_term)

        result = self.g.query(sparql)
        return result

    def run_query(self, search):
        self.load_graph()

        row = self.query(search)
        s_list = []
        for r in row:
            s_list.append(r.asdict()["pref"].toPython())
        return s_list
