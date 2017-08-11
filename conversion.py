'''
   Conversion classes
'''
import json
import uuid
from rdflib import Graph, URIRef, Literal, Namespace
import time

class Convert():
    '''
       Class containing methods for the data conversion
    '''

    def __init__ (self):
        self.EEBO = Namespace("http://eeboo.oerc.ox.ac.uk/")

    def dump_to_disk(self, fs, data):
        if data is None:
            raise Exception("Data is empty")
        _data = json.dumps(data)
        for d in data:
            with open(fs + str(time.time())+".json", 'wb') as f:
                f.write(json.dumps(d))
        return json.dumps({ "id": self._generate_uid()})

    def convert_json_rdf(self, _data):
        '''
          Method to save the JSON from the UI to rdf
        '''
        for data in _data:
            self._to_data_graph(data["id"], data["data"])
            self._to_stats_graph(data["id"], data["similarity"])
        
        return json.dumps({ "id": self._generate_uid})

    def _to_json(self, d):
        '''
           Convert JSON to Python dictionary
        '''
        if d is None:
            raise Exception("No JSON to convert")
        return json.loads(d)

    def _generate_uid(self):
        '''
           Method to return a UID
        '''
        return str(uuid.uuid4())
 
    def _to_data_graph(self, _id, datagraph):
        '''
           Method to write data from UI data object into RDF
        '''
        g = Graph()

        for gd in datagraph:
            g.add( (URIRef(_id), gd[0], gd[1]) )

        self._write("data" ,g, _id)

    def _to_stats_graph(self, _id, statsgraph):
        '''
           Method to write stats graph to data
        '''
        g = Graph()
        
        for gd in statsgraph:
            g.add( (gd[0], gd[1], gd[2]) )

        self._write("stats", g, _id)

    def _write(self, datatype, g, _id):
        '''
          Method to serialise the graph data to file
        '''
        g.serialize(destination=_id + str(time.time()) + '.ttl', format='turtle')
