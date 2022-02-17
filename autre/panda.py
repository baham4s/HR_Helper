import pandas as pd
d = {'ColonneA' : pd.Series([111, 222, 333]),
     'ColonneB' : pd.Series([444, 555, 666])}
df = pd.DataFrame(d)
print(df)

#pour afficher une colonne
data = df['ColonneA']
print("données dans la colonne a \n",data)

#pour supprmer une colonne
df.pop['ColonneA']
print(df)


