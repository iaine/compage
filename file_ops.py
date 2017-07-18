'''
   Generic functions for files
'''

class FileOps:
    def open(self, name):
        '''
           Open the file and return a string
        '''
        with open(name, 'rb') as f:
            return f.read()
