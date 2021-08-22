import requests
import random
import string
import time
import csv
import numpy as np

chars = string.digits + string.ascii_letters + string.punctuation

def create_random(size):
    n = ''.join((random.choice(chars) for _ in range(size)))
    return n

def average(results_list):
    return sum(results_list) / len(results_list)

def percentile(results_list, percentile_no):
    arr = np.array(results_list)
    percentile = np.percentile(arr, percentile_no)
    return percentile

mon_aes_test_results = []
mon_des_test_results = []
mon_rsa_test_results = []

mic_aes_test_results = []
mic_des_test_results = []
mic_rsa_test_results = []

#MONOLITHIC QUERIES ===========================================================================================================================================
def mon_aes_test():
    start_time = time.time()

    mon_query_aes = {'enctype': 'AES', 'msg': create_random(2048), 'aes_key': create_random(128)}
    response = requests.get('https://jdhl7mi3nc.execute-api.ap-southeast-1.amazonaws.com/Prod/all-enc', params = mon_query_aes)
    #print(response.json())
    response_time = time.time() - start_time
    print("--- %s seconds ---" % response_time)

    file = open('test_results/mon_tests/mon_aes_test.csv', 'a')
    writer = csv.writer(file)
    writer.writerow([mon_query_aes, response_time])

    mon_aes_test_results.append(response_time)


def mon_des_test():
    start_time = time.time()

    mon_query_des = {'enctype': 'DES', 'msg': create_random(2048), 'des_key': create_random(128)}
    response = requests.get('https://jdhl7mi3nc.execute-api.ap-southeast-1.amazonaws.com/Prod/all-enc', params = mon_query_des)
    #print(response.json())
    response_time = time.time() - start_time
    print("--- %s seconds ---" % response_time)

    file = open('test_results/mon_tests/mon_des_test.csv', 'a')
    writer = csv.writer(file)
    writer.writerow([mon_query_des, response_time])

    mon_des_test_results.append(response_time)

def mon_rsa_test():
    start_time = time.time()

    mon_query_rsa = {'enctype': 'RSA', 'msg': create_random(2048)}
    response = requests.get('https://jdhl7mi3nc.execute-api.ap-southeast-1.amazonaws.com/Prod/all-enc', params = mon_query_rsa)
    #print(response.json())
    response_time = time.time() - start_time
    print("--- %s seconds ---" % response_time)

    file = open('test_results/mon_tests/mon_rsa_test.csv', 'a')
    writer = csv.writer(file)
    writer.writerow([mon_query_rsa, response_time])

    mon_rsa_test_results.append(response_time)

#MICROSERVICES QUERIES =======================================================================================================================================
def mic_aes_test():
    start_time = time.time()

    mic_query_aes = {'msg': create_random(2048), 'aes_key': create_random(128)}
    response = requests.get('https://hjhtd9o1d5.execute-api.ap-southeast-1.amazonaws.com/Prod/aes', params = mic_query_aes)
    #print(response.json())
    response_time = time.time() - start_time
    print("--- %s seconds ---" % response_time)

    file = open('test_results/mic_tests/mic_aes_test.csv', 'a')
    writer = csv.writer(file)
    writer.writerow([mic_query_aes, response_time])

    mic_aes_test_results.append(response_time)

def mic_des_test():
    start_time = time.time()

    mic_query_des = {'msg': create_random(2048), 'des_key': create_random(128)}
    response = requests.get('https://hjhtd9o1d5.execute-api.ap-southeast-1.amazonaws.com/Prod/des', params = mic_query_des)
    #print(response.json())
    response_time = time.time() - start_time
    print("--- %s seconds ---" % response_time)

    file = open('test_results/mic_tests/mic_des_test.csv', 'a')
    writer = csv.writer(file)
    writer.writerow([mic_query_des, response_time])

    mic_des_test_results.append(response_time)

def mic_rsa_test():
    start_time = time.time()

    mic_query_rsa = {'msg': create_random(2048)}
    response = requests.get('https://hjhtd9o1d5.execute-api.ap-southeast-1.amazonaws.com/Prod/rsa', params = mic_query_rsa)
    #print(response.json())
    response_time = time.time() - start_time
    print("--- %s seconds ---" % response_time)

    file = open('test_results/mic_tests/mic_rsa_test.csv', 'a')
    writer = csv.writer(file)
    writer.writerow([mic_query_rsa, response_time])

    mic_rsa_test_results.append(response_time)

#COMMANDS ==================================================================================================================================================
trials = 1000

for i in range(trials):
    print("--- %s TRIALS ---" % (i+1))
    mon_aes_test()
    mon_des_test()
    mon_rsa_test()

    mic_aes_test()
    mic_des_test()
    mic_rsa_test()