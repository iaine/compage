'''
   Similarity calculation methods
'''

class Similarities():

    def jaccard_similarity(lista, listb):
        '''
            Calculate the Jaccard similarity for two sets
        '''
        if len(lista) == 0 or len(listb) == 0:
            raise ValueError('Empty list received')
        seta = set(lista)
        setb = set(listb)
        return seta.intersection(setb) / seta.union(setb)

    def cosine_similarity():
        pass
