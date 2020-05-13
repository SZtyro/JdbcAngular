import unittest

from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC

from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait


class Localhost(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path='chromedriver.exe')

    def tests_main(self):
        driver = self.driver
        driver.get('http://localhost:4200/')
        driver.get('http://localhost:4200/')
        self.assertIn('AngularJDBC', driver.title)
        print(driver.title)

        parentWindow = driver.window_handles
        print(parentWindow)
        driver.implicitly_wait(15)

        #wait = WebDriverWait(driver, 10)
        #element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'ng-star-inserted')))

        elem = driver.find_element_by_css_selector('button.ng-star-inserted')
        elem.click()
        wait = WebDriverWait(driver, 10)
        wait.until(EC.number_of_windows_to_be(2))

        for handle in driver.window_handles:
            driver.switch_to.window(handle)
            print(driver.title)
            googleTitle = driver.title

        self.assertTrue('Logowanie – Kontax Google', googleTitle)

    def setDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()

