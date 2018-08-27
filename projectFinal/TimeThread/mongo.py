from pymongo import MongoClient
import time
import threading
import string
import random


def strGenerator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.SystemRandom().choice(chars) for _ in range(size))

def navidPayer():
    client = MongoClient('127.0.0.1', 27017)
    # Get the sampleDB database
    db = client.devwp
    salary = db.Salary
    sum = 0
    for val in salary.find():
        amount = val['amount']
        amount = int(amount)
        sum += amount
    companyWallet = db.Wallet
    company = companyWallet.find_one({"username": "company"})
    companyAmount = company['rial']
    companyAmount = int(companyAmount)
    if companyAmount >= sum:
        myquery = {"username": "company"}
        newVal = companyAmount - sum
        newvalues = {"$set": {"rial": newVal}}
        companyWallet.update_one(myquery, newvalues)
        print("success pay!")
    else:
        warning = db.Warnings
        print(companyAmount)
        print(sum)
        newVal = sum - companyAmount
        nowTime = str(time.ctime())
        myId = strGenerator(6)
        messege = "not enough money boss! need:" + str(newVal) + " rials, time generated: " + nowTime
        mydict = {"messege": messege, "myId": myId}
        warning.insert_one(mydict)
        print(messege)

    threading.Timer(5,navidPayer).start()


def navidFailer():
    client = MongoClient('127.0.0.1', 27017)
    db = client.devwp
    transactions = db.Transactions
    myquery = {"Status": "Pending"}
    newVal = "Failed"
    newvalues = {"$set": {"Status": newVal}}
    transactions.update_many(myquery, newvalues)
    print("automatic transaction failing succsess")
    threading.Timer(600, navidFailer).start()


navidPayer()
navidFailer()

