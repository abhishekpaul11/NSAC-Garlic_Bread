from selenium import webdriver
from bs4 import BeautifulSoup
import httplib2
from googlesearch import search
import requests
import pandas as pd
import datetime
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# Start the session
listUrls = ["https://urs.earthdata.nasa.gov/oauth/authorize?response_type=code&client_id=sXTOeM-6RH5fuK3TacT_Ag&redirect_uri=https://nrt3.modaps.eosdis.nasa.gov/login"]
browser = webdriver.Chrome("C:/Users/Piyush Goel/Downloads/chromedriver_win32 (1)/chromedriver")
urls=[]
st=''


for url in listUrls:
    browser.get(url)
    browser.find_element_by_id('username').send_keys('abhishek6969')
    browser.find_element_by_id ('password').send_keys('GarlicBread123')
    browser.find_element_by_name('commit').click()
    #browser.switch_to.frame(browser.find_element_by_name('))
    #browser.find_element_by_link_text(' FIRMS Data').click()
    #browser.find_element_by_link_text('viirs').click()
    #browser.get('https://nrt3.modaps.eosdis.nasa.gov/archive/FIRMS/viirs/Global')
    soup = BeautifulSoup(browser.page_source,"html.parser")
    time.sleep(25)
    browser.find_element_by_link_text('FIRMS Data').click()
    time.sleep(10)
    browser.find_element_by_link_text('viirs').click()
    time.sleep(5)
    browser.find_element_by_link_text('Global').click()
    time.sleep(5)
    browser.find_element_by_link_text('CSV').click()
    time.sleep(5)
    browser.find_element_by_link_text('Download CSV').click()    
    #browser.find_element_by_link_text('Download CSV').send_keys(Keys.COMMAND + 'w') 
    #browser.find_element_by_link_text('Download CSV').click() 
    #results = soup.findAll('a')
    #print(results)
    '''
    for result in results:
        link = result["href"]
        urls.append(link)
    print (urls)
    
    time.sleep(5)
    for link in soup.find_all('a',class_='sc-bdVaJa kBWXTA'):
        if link.has_attr('href'):
            print(link['href'])
    '''
    f = open("C:/Users/Piyush Goel/Downloads/Global.html", "r")
    st+=f.read()
    li=st.split(',')
    for i in li:
        if('.txt' in i):
            browser.get('https://nrt3.modaps.eosdis.nasa.gov'+i).send_keys(Keys.COMMAND + 't')
        
