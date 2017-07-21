'''
   Class to complete the autosearch
'''
from file_ops import FileOps
from sparqldao import SparqlDao

class SearchData():

    def __init__(self, endpoint):
        self.endpoint = endpoint

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
            terms.append({'id': data[0], 'values': data[1]})

        return json.dumps({terms})
