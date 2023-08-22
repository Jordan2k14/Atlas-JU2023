import numpy as np
import random
import pandas as pd
import time
import matplotlib.pyplot as plt
from sklearn.utils import resample
from sklearn.preprocessing import StandardScaler, MinMaxScaler, MaxAbsScaler
from pandas import Series, DataFrame
import pickle
from xgboost import XGBClassifier
import xgboost


# Importing Dataset
path = 'creditcard.csv'
df = pd.read_csv(path) # Importing our dataset 
print(df.head())

df.Amount.min(), df.Amount.max()
minmax = [df.min(axis = 0),df.max(axis = 0)]
minmax

for a in df['Amount'].values:
    print(type(a))
    time.sleep(1)

# Scaling our dataset 
sc = StandardScaler()
amount = df['Amount'].values 
df['Amount'] = sc.fit_transform(amount.reshape(-1, 1))

#for a in df['Amount'].values:
 #   print(a)
 #   print(type(a))
 #   time.sleep(1)

# Droppping Duplcates
df = df.drop_duplicates()
df = df.drop(columns = 'Time') #Dropping time after checking duplicates

 # Deletes outliers, only in class 0, otherwise to many points of the minority class would be droped
by_class = df.groupby('Class')
tmp_0 = pd.DataFrame(by_class.get_group(0))
tmp_1 = pd.DataFrame(by_class.get_group(1))
for x in df.columns[0:-1]:
    q75,q25 = np.percentile(df.loc[:,x],[75,25])
    intr_qr = q75-q25

    max = q75+(1.5*intr_qr)
    min = q25-(1.5*intr_qr)

    tmp_0.loc[tmp_0[x] < min,x] = np.nan
    tmp_0.loc[tmp_0[x] > max,x] = np.nan
    a = len(df)
    df = pd.concat([tmp_0.iloc[:], tmp_1.iloc[:]])
    b = len(df)
    n_downsampled = a-b
df = df.dropna()
check_for_0 = df.drop(['Class'],axis=1)
n_datapoints = len(df)

# ---------
df.Amount.min(), df.Amount.max()
minmax = [df.min(axis = 0),df.max(axis = 0)]
minmax
# 1 way of handeling the data. 
# Upsampling the minority class, downsampling the majority class, splitting the data. Still unbalanced data
# The minority class is being upsampled after splitting the data, which means that the test set contains
# data thats never been seen before
def split_dataset(df, split_size=0.8, downsample = True, frac_downsample = 0.2, upsample = True, frac_upsample = 0.5):
    
    n_downsampled = 0
    n_upsampled = 0
    df_train = pd.DataFrame()
    df_test = pd.DataFrame()
    by_class = df.groupby('Class')
    
    if downsample:
        # Deletes % of the majority class
        a = len(df)
        df = df.drop(df[df['Class'] == 0].sample(frac=frac_downsample).index) 
        b = len(df)
        n_downsampled = a-b


    sampled_df = df
    c = int(0.8*len(by_class.get_group(0)))
    df_train = df_train.append(by_class.get_group(0).iloc[0:c])
    df_test = df_test.append(by_class.get_group(0).iloc[c:])
    c = int(0.8*len(by_class.get_group(1)))
    df_train = df_train.append(by_class.get_group(1).iloc[0:c])
    df_test = df_test.append(by_class.get_group(1).iloc[c:])

    by_class2 = df_train.groupby('Class')
    if upsample: 
        #upsampling the minority class with given%
        df_minority = resample(by_class2.get_group(1), replace=True, n_samples=int(len(by_class2.get_group(1))*frac_upsample))
        df_train = pd.concat([df_train, df_minority])
        n_upsampled = len(df_minority)
    
    return df_train, df_test, sampled_df, n_upsampled, n_downsampled

df_train, df_test, sampled_df, n_upsampled, n_downsampled = split_dataset(df, downsample = True, frac_downsample = 0.5, upsample = True, frac_upsample = 5 )

# XGBBoost
xgb = XGBClassifier(max_depth = 4)
xgb
xgb.fit(df_train[df_train.columns[0:-1]],df_train[df_train.columns[-1]])
pred = xgb.predict(df_test[df_test.columns[0:-1]])
y_score = xgb.predict_proba(df_test[df_test.columns[0:-1]])[:,1]

filename = 'trained_model.plk' # How is this being used.
f = open(filename, 'wb')
pickle.dump(xgb, f)
f.close()
