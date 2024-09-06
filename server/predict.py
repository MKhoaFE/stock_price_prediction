import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Load the data from the CSV file
file = sys.argv[1]
data = pd.read_csv(file)

# Assuming 'Date' is in one column and 'Close' in another
data['Date'] = pd.to_datetime(data['Date'])
data['Days'] = (data['Date'] - data['Date'].min()).dt.days

# Prepare the dataset for training
X = data[['Days']]
y = data['Close']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict the next day's price (one day ahead of the latest date)
next_day = [[X['Days'].max() + 1]]
prediction = model.predict(next_day)

# Return the predicted price
print(prediction[0])
