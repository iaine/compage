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

    def square_rooted(t):
        if t > 0:
            return round(sqrt(t*t),3)
        else:
            return 0.001

   def cosine_similarity(x, y):
       numerator = x * y
       denominator = square_rooted(x)*square_rooted(y)
       return round(numerator/float(denominator),3)
