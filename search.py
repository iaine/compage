'''
   Class to complete the autosearch
'''

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
        original = sd.run_remote_sparql(self.endpoint, qry_string)

        return json.dumps({original})
