'''
   Similarity calculation methods
'''

class Similarities():

    def jaccard_similarity(self, lista, listb):
        '''
            Calculate the Jaccard similarity for two sets
        '''
        if len(lista) == 0 or len(listb) == 0:
            raise ValueError('Empty list received')
        seta = set(lista)
        setb = set(listb)
        return float(len(seta.intersection(setb))) / float(len(seta.union(setb)))

    def square_rooted(self, t):
        if t > 0:
            return round(sqrt(t*t),3)
        else:
            return 0.001

    def cosine_similarity(self, x, y):
        numerator = x * y
        denominator = square_rooted(x)*square_rooted(y)
        return round(numerator/float(denominator),3)

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

    def pair_similarities (self, graph_list):
        '''
           Method for calculating the similarities of pairs in a graph
        '''
        similarities = []
        start_graph = None
        for name, graphvalue in graph_list.iteritems():
            start_graph = name
            start_graph_values = graphvalue
            stats = self.pair_similarities_stats(start_graph,start_graph_values, graph_list)
            #graph_links = self.pair_similarities_list(start_graph, graph_list)
            #unlinks = self.pair_similarities_dissimilar(graph_links, graph)
            similarities.append({'name':start_graph, 'js': stats})

        return similarities
                

                
    def filter_graph(self, graphlist):
        '''
           Filter out the first part of the triple and return as list
        '''
        return list(filter(lambda x: (x[1], x[2]), graphlist))
 
    def pair_similarities_stats(self,init_name, init_graph, graph_list):
        '''
           Method to get the Jaccard similarity for the graphs 
           Returns a list of tuples of (lista, listb, similarity_score)
        '''
        similarities = []
        for graphname, graphvalue in graph_list.iteritems():
            if graphname != init_name:
                jaccard = self.jaccard_similarity(init_graph, graphvalue)
                similarities.append((init_name, graphname, jaccard))

        return similarities

    def pair_similarities_list(self, init_graph, graph_list):
        '''
          Method to get the data from the graphs
        '''

        link = []
        
        for name, value in graph_list,iteritems():
            if start_graph[1] == graph[1] and start_graph[2] == graph[2]:
                link.append(graph)

        return link

    def pair_similarities_dissimilar(self, link, graph_list):
        '''
          Get the dissimilarities
        '''
        unlink = []
        for graph in graph_list:
            if graph[1] not in link:
                unlink.append(graph)

        return unlink
