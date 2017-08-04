'''
   Fetch graph structure from db and put into json
'''
import json

from sparqldao import SparqlDao
from file_ops import FileOps
from similarity import Similarities
from collections import defaultdict

class JoinGraph:

    def __init__(self, endpoint):
        self.endpoint = endpoint

    def deduplicate_data(self, a, b):
        '''
           Deduplicating data
        '''
        return list(set(a) - set(b))

    def calculate_similarity_perc(self, lista, listb):
        '''
            Return similarities. Useful for filtering
        '''
        return float(len(lista))/float(len(listb))

    def get_data_list(self, sparql_file, searchstr):
        qry_string = FileOps().open(sparql_file).format(searchstr)
        data = sd.run_remote_sparql(self.endpoint, qry_string)
        return data 

    def join_graphs(self, graph):
        merged_data = []

        original = []
        sd = SparqlDao()
        
        qry_string = FileOps().open('query/original_author.rq') 
        qry_string = qry_string.format(graph)
        original = sd.run_remote_sparql(self.endpoint, qry_string)

        #get the other graphs linked by VIAF
        qry_string = FileOps().open('query/walk_path_query.rq')
        qry_string = qry_string.format(graph)

        merged_data = sd.run_remote_sparql(self.endpoint, qry_string)

        link = []
        unlink = []
        for merge in merged_data:
            for orig in original:
                if orig[2] == merge[2] and orig[1] == merge[1]:
                    link.append(merge)

            if merge[1] not in link:
                unlink.append(merge)

        return json.dumps({"original":original,"link":link,"difference":self.deduplicate_data(unlink,link),"similarity":self.calculate_similarity_perc(link,original)})

    def search_data(self, term):
        '''
           Perform substring search on data and return JSON
        '''
        original = []
        sd = SparqlDao()

        qry_string = FileOps().open('query/search_string.rq')
        qry_string = qry_string.format(term)
        original = sd.autocomplete_sparql(self.endpoint, qry_string)

        terms  = []
        for data in original:
            terms.append({'id': data[0], 'value': data[1]})

        return json.dumps(terms)

    def search_subject(self, searchterm):
        '''
          Find subjects associated with a predicate
          @todo: put this into named graph with time. 
          @todo: filter this for workset or non-workset. 
        '''
        original = []
        sd = SparqlDao()

        qry_string = FileOps().open('query/search_subjects.rq')
        qry_string = qry_string.format('<'+searchterm+'>')

        original = sd.list_sparql(self.endpoint, qry_string)
        return json.dumps(original)

    def search_predicates(self, searchterm):
        '''
          Find predicates associated with an object and calculates the weightings
          @todo: put this into named graph with time. 
          @todo: filter this for workset or non-workset. 
        '''
        original = []
        sd = SparqlDao()
        simil = Similarities()

        if "http" in searchterm:
            qry_string = FileOps().open('query/search_predicates_uri.rq')
            qry_string = qry_string.format('<'+searchterm+'>')
        else:
            qry_string = FileOps().open('query/search_predicates_literal.rq')
            qry_string = qry_string.format('"'+searchterm+'"')
        original = sd.autocomplete_sparql(self.endpoint, qry_string)

        count = 0
        preds = []
        for orig in original:
            count += int(orig[0])

        for data in original:
            preds.append({ "predicate": data[1], "weight": self._calculate_weight(data[0], count)})

        return json.dumps(preds)

    def search_predicates_object(self, predicate, obj, workset):
        '''
           Search (predicate, object) pair in a workset
        '''
        sd = SparqlDao()

        if "http" in obj:
            qry_string = FileOps().open('query/search_predicates_uri_ws.rq')
            qry_string = qry_string.format('<'+pred+'>', '<'+obj+'>', '<'+workset+'>')
        else:
            qry_string = FileOps().open('query/search_predicates_literal_ws.rq')
            qry_string = qry_string.format('<'+pred+'>','"'+obj+'"', '<'+workset+'>')

        original = sd.autocomplete_sparql(self.endpoint, qry_string)

        count = 0
        preds = []
        for orig in original:
            count += int(orig[0])

        for data in original:
            preds.append({ "predicate": data[1], "weight": self._calculate_weight(data[0], count)})

        return json.dumps(preds)
    def _calculate_weight(self, weight, count):
        if weight is None or weight < 1:
            return 0
        
        return round(((float(weight)/count) * 100), 2)

    def get_original(self, graphs):
        '''
          Gets the base graphs for the request
        '''
        original = []
        sd = SparqlDao()
        searchterm = ''
        for g in graphs:
            searchterm += '<' + str(g) + '>'

        qry_string = FileOps().open('query/original_author.rq')
        qry_string = qry_string.format(searchterm)


        original = sd.run_remote_sparql(self.endpoint, qry_string)
        return json.dumps(original)

    def worksets(self):
        '''
          Method to retain all worksets
        '''
        sd = SparqlDao()
        
        qry_string = FileOps().open('query/allworksets.rq')

        original = sd.autocomplete_sparql(self.endpoint, qry_string)

        preds = []
        for data in original:
            preds.append({ "value": data[1], "id": data[0]})

        return json.dumps(preds)

    def worksets_by_id(self, workset_id):
        '''
          Method to get all ids from a known workset
        '''
        sd = SparqlDao()
        qry_string = FileOps().open('query/worksetsid.rq').format('<'+workset_id+'>')

        original = sd.autocomplete_sparql(self.endpoint, qry_string)

        preds = []
        for data in original:
            preds.append({ "value": data[1], "id": data[0]})

        return json.dumps(preds)
