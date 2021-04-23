# 기본 패키지
import re
import time
import pickle
import pandas as pd
from tqdm import tqdm
from tqdm import trange
import warnings
warnings.filterwarnings('ignore')

# 크롤링 패키지
import requests
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# 위치 설정하기
def set_location(location):
    print(location+'으로 위치 설정 하는중...')
    driver.find_element_by_css_selector('#search > div > form > input').click()
    driver.find_element_by_css_selector('#button_search_address > button.btn-search-location-cancel.btn-search-location.btn.btn-default > span').click()
    driver.find_element_by_css_selector('#search > div > form > input').send_keys(location)
    driver.find_element_by_css_selector('#button_search_address > button.btn.btn-default.ico-pick').click()
    time.sleep(2)
    driver.find_element_by_css_selector('#search > div > form > ul > li:nth-child(4) > a').click()
    time.sleep(2)
    print(location+'으로 위치 설정 완료!')


# 카테고리 페이지로 넘어가기
def go_to_category(category):
    print(category+' 카테고리 페이지 로드중...')
    driver.find_element_by_xpath('//*[@id="category"]/ul/li[{}]/span'.format(food_dict.get(category))).click()
    time.sleep(4)
    print(category+' 카테고리 페이지 로드 완료!')

# 카테고리(음식점 리스트) 페이지 펼치기
def stretch_list_page():
    print('음식점 리스트 펼치기 시작...')
    # restaurant_count = int(driver.find_element_by_css_selector('#restaurant_count').text)
    # scroll_count = int((restaurant_count/20))
    # for _ in trange(scroll_count):
    #     try:
    #         driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
    #         time.sleep(5)
    #     except Exception as e:
    #         pass
    driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
    time.sleep(5)
    print('모든 음식점 리스트 펼치기 완료!')

# 해당 카테고리의 음식점 리스트 리턴
def get_restaurant_list():
    restaurant_list=[]
    restaurants = driver.find_elements_by_css_selector('#content > div > div:nth-child(4) > div > div.restaurant-list > div.col-sm-6.contract')
    for restaurant in restaurants:
        restaurant_list.append(restaurant.find_element_by_css_selector('div > table > tbody > tr > td:nth-child(2) > div > div.restaurant-name.ng-binding').text)
    return list(set(restaurant_list))

# 검색창에 음식점 검색
def search_restaurant(restaurant_name):
    try:
        driver.find_element_by_xpath('//*[@id="category"]/ul/li[1]/a').click()
        driver.find_element_by_xpath('//*[@id="category"]/ul/li[15]/form/div/input').send_keys(restaurant_name)
        driver.find_element_by_xpath('//*[@id="category_search_button"]').click()
        driver.execute_script("window.scrollTo(document.body.scrollHeight,0);")
    except Exception as e:
        print('search_restaurant 에러')
    time.sleep(5)

# 검색한 음식점 클릭
def go_to_restaurant():
    try:
        driver.find_element_by_xpath('//*[@id="content"]/div/div[5]/div/div/div/div').click()
    except Exception as e:
        try:
            driver.find_element_by_xpath('//*[@id="content"]/div/div[5]/div/div/div[1]/div').click()
        except Exception as e:
            print('go_to_restaurant 에러')
    time.sleep(5)


# 해당 음식점의 정보 페이지로 넘어가기
def go_to_introduce():
    print('음식점 정보 페이지 로드중...')
    driver.find_element_by_xpath('//*[@id="content"]/div[2]/div[1]/ul/li[3]/a').click()
    time.sleep(2)
    print('음식점 정보 페이지 로드 완료!')

# 해당 음식점의 모든 메뉴 객체 리턴
def get_all_menu_elements():
    menus = driver.find_elements_by_css_selector('#menu > div > div:nth-child(2) > div.panel-collapse.collapse.in.btn-scroll-container > div > ul > li.ng-scope.photo-menu')
    return menus

# 페이지 뒤로 가기 (한 음식점 리뷰를 모두 모았으면 다시 음식점 리스트 페이지로 돌아감)
def go_back_page():
    print('페이지 돌아가기중...')
    driver.execute_script("window.history.go(-1)")
    time.sleep(5)
    print('페이지 돌아가기 완료!'+'\n')


# 크롤링 메인 함수
def yogiyo_crawling(location, category):
    try:
        set_location(location) # 검색할 지역 설정
        go_to_category(category) # 해당 카테고리(음식점 리스트) 페이지로 넘어감

        print('Start [ {} - {} ] Crawling...'.format(location, category))

        stretch_list_page() # 카테고리(음식점 리스트) 페이지 모두 펼치기
        restaurant_list = get_restaurant_list()[:10] # 해당 카테고리 음식점 리스트 받아오기
        print( 'restaurant_list ', restaurant_list)
        for i, restaurant_name in enumerate(restaurant_list):
            try:
                print('********** '+restaurant_name+' ( '+str(restaurant_list.index(restaurant_name)+1)
                      +'/'+str(len(restaurant_list))+' 번째) **********')

                search_restaurant(restaurant_name) # 음식점을 순서대로 검색
                go_to_restaurant() # 검색한 음식점 클릭

                df_bigcate.loc[len(df_bigcate)] = {
                    'store':driver.find_element_by_class_name('restaurant-name').text,
                    'category': category,
                }

                if restaurant_name in df["name"] : continue

                for menu in tqdm(get_all_menu_elements()):  # 해당 음식점의 리뷰 수 만큼 데이터를 가져옴
                    print("메뉴 가져오기 시작")
                    try:
                        print("menu is "+menu.find_element_by_css_selector('div.menu-name.ng-binding').text)
                        df_menu.loc[len(df_menu)] = {
                            'store':driver.find_element_by_class_name('restaurant-name').text,
                            'name':menu.find_element_by_css_selector('div.menu-name.ng-binding').text,
                            'price':menu.find_element_by_css_selector('div.menu-price > span:nth-child(1)').text,
                            'image':WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, "table > tbody > tr > td.photo-area > div"))).value_of_css_property("background-image")
                        }
                    except Exception as e:
                        print('메뉴 페이지 에러')
                        print(e)
                        pass

                go_to_introduce()
                print('이름 '  ,driver.find_element_by_class_name('restaurant-name').text)
                df.loc[len(df)] = {
                    'name':driver.find_element_by_class_name('restaurant-name').text,
                    'location': driver.find_element_by_css_selector('#info > div:nth-child(2) > p:nth-child(4) > span').text,
                    'intro':driver.find_element_by_css_selector('#info > div:nth-child(1) > div.info-text.ng-binding').text,
                }

            except Exception as e:
                print('*** '+restaurant_name+' *** 음식점 페이지 에러')
                print(e)
                pass

            print('음식점 리스트 페이지로 돌아가는중...')
            go_back_page() # 해당 음식점 리뷰를 모두 모았으면 다시 음식점 리스트 페이지로 돌아감

    except Exception as e:
        print('음식점 리스트 페이지 에러')
        print(e)
        pass
    go_back_page()
    return

# 모든 서울 관할구역 크롤링 실행 함수
def start_gangnamgu_crawling(category):
    gu = {
        '종로구' : '청운효자동 · 사직동 · 삼청동 · 부암동 · 평창동 · 무악동 · 교남동 · 가회동'.split(' · '),
        '중구' : '소공동 · 회현동 · 명동 · 필동 · 장충동 · 광희동 · 을지로동 · 신당동 · 다산동 · 약수동 · 청구동 · 동화동 · 황학동 · 중림동'.split(' · '),
        '용산구' : '후암동 · 용산동 · 남영동 · 청파동 · 원효로 · 효창동 · 용문동 · 한강로 · 이촌동 · 이태원동 · 한남동 · 서빙고동 · 보광동'.split(' · '),
        '성동구' : '도선동 · 왕십리동 · 마장동 · 사근동 · 행당동 · 응봉동 · 금호동 · 옥수동 · 성수동 · 송정동 · 용답동'.split(' · '),
        '광진구' : '중곡동 · 능동 · 구의동 · 광장동 · 자양동 · 화양동 · 군자동'.split(' · '),
        '동대문구' : '용신동 · 제기동 · 전농동 · 답십리동 · 장안동 · 청량리동 · 회기동 · 휘경동 · 이문동'.split(' · '),
        '중랑구' : '면목동 · 상봉동 · 중화동 · 묵동 · 망우동 · 신내동'.split(' · '),
        '성북구' : '성북동 · 종암동 · 석관동 · 삼선동 · 동선동 · 돈암동 · 안암동 · 보문동 · 정릉동 · 길음동 · 월곡동 · 장위동'.split(' · '),
        '강북구' : '삼양동 · 미아동 · 송중동 · 송천동 · 삼각산동 · 번동 · 수유동 · 우이동 · 인수동'.split(' · '),
        '도봉구' : '쌍문동 · 방학동 · 창동 · 도봉동'.split(' · '),
        '노원구' : '월계동 · 공릉동 · 하계동 · 중계동 · 상계동'.split(' · '),
        '은평구' : '녹번동 · 불광동 · 갈현동 · 구산동 · 대조동 · 응암동 · 역촌동 · 신사동 · 증산동 · 수색동 · 진관동'.split(' · '),
        '서대문구' : '충현동 · 천연동 · 북아현동 · 신촌동 · 연희동 · 홍제동 · 홍은동 · 남가좌동 · 북가좌동'.split(' · '),
        '마포구' : '공덕동 · 연남동 · 용강동 · 망원동 · 아현동 · 도화동 · 대흥동 · 염리동 · 신수동 · 서강동 · 서교동 · 합정동 · 성산동 · 상암동'.split(' · '),
        '양천구' : '목동 · 신월동 · 신정동'.split(' · '),
        '강서구' : '염창동 · 등촌동 · 화곡동 · 우장산동 · 가양동 · 발산동 · 공항동 · 방화동'.split(' · '),
        '구로구' : '신도림동 · 구로동 · 가리봉동 · 수궁동 · 고척동 · 개봉동 · 오류동 · 항동'.split(' · '),
        '금천구' : '가산동 · 독산동 · 시흥동'.split(' · '),
        '영등포구' : '영등포동 · 당산동 · 여의동 · 도림동 · 문래동 · 양평동 · 신길동 · 대림동'.split(' · '),
        '동작구' : '노량진동 · 사당동 · 상도동 · 흑석동 · 대방동 · 신대방동'.split(' · '),
        '관악구' : '신림동 · 신사동 · 보라매동 · 은천동 · 성현동 · 중앙동 · 청림동 · 행운동 · 청룡동 · 낙성대동 · 인헌동 · 남현동 · 조원동 · 미성동 · 난곡동 · 난향동 · 서원동 · 신원동 · 서림동 · 삼성동 · 대학동'.split(' · '),
        '서초구' : '반포동 · 양재동 · 서초동 · 잠원동 · 방배동 · 내곡동'.split(' · '),
        '강남구' : '신사동 · 개포동 · 압구정동 · 청담동 · 논현동 · 삼성동 · 대치동 · 역삼동 · 도곡동 · 일원동 · 수서동 · 세곡동'.split(' · '),
        '송파구' : '풍납동 · 송파동 · 거여동 · 마천동 · 방이동 · 오륜동 · 오금동 · 석촌동 · 삼전동 · 가락동 · 문정동 · 장지동 · 위례동 · 잠실동'.split(' · '),
        '강동구' : '강일동 · 천호동 · 상일동 · 명일동 · 고덕동 · 암사동 · 성내동 · 길동 · 둔촌동'.split(' · ')
    }

    for key in gu.keys():
        for i, dong in enumerate(gu[key]):
            if i>3 : break
            try:
                yogiyo_crawling('{} {}'.format(key, dong), category)
                print(dong+' - '+category+'완료')
            except Exception as e:
                print('***** '+dong+' 에러 발생 *****')
                print(e)
                pass

# Chrome webdriver - 요기요 메인 페이지 실행
options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
path = "C:/Users/Jung-Ji-Yun/chromedriver_win32/chromedriver.exe"
driver = webdriver.Chrome(path,options=options)

url = "https://www.yogiyo.co.kr/mobile/#/"
driver.get(url)

food_dict = { '치킨':5, '피자/양식':6, '중국집':7, '한식':8, '일식/돈까스':9, '족발/보쌈':10, '야식':11, '분식':12, '카페/디저트':13 }

# 모든 카테고리에 대해 관할구역 별 크롤링 수행 후 csv로 저장
for cate in ['치킨','분식','일식/돈까스','족발/보쌈','중국집','한식','피자/양식','카페/디저트','야식']:
    df = pd.DataFrame(columns=['name','intro','location'])
    df_menu = pd.DataFrame(columns=['store','name','price','image'])
    df_bigcate = pd.DataFrame(columns=['store','category'])
    start_gangnamgu_crawling(cate)
    df.to_csv('./data/{}_df.csv'.format(cate[:2]), index=False, encoding='utf8')
    df_menu.to_csv('./data/{}_df_menu.csv'.format(cate[:2]), index=False, encoding='utf8')
    df_bigcate.to_csv('./data/{}_df_bigcate.csv'.format(cate[:2]), index=False, encoding='utf8')


print(df_bigcate)
print('End of Crawling!')
