# Snapchat Account Number Checker

**Snapchat Account Number Checker** is a Python script that leverages asynchronous programming and Selenium to automate the retrieval of Snapchat account phone numbers. It automates the login process, handles captchas, and extracts phone numbers associated with Snapchat accounts while maintaining anonymity through proxy usage.

## Features

- **Automated Login:** Seamlessly log into multiple Snapchat accounts.
- **Captcha Handling:** Automatically manages captcha challenges during the login process.
- **Phone Number Extraction:** Retrieves and stores phone numbers linked to Snapchat accounts.
- **Proxy Support:** Utilize proxies to maintain anonymity and prevent IP blocking.
- **Asynchronous Processing:** Efficiently handle multiple accounts simultaneously for faster results.

## Prerequisites

Before setting up the **Snapchat Account Number Checker**, ensure you have the following installed:

- **Python:** Version 3.6 or higher.
- **Google Chrome:** Latest version recommended.
- **Git:** For cloning the repository.
- **Proxies:** A list of working proxies in the format `IP:PORT:USER:PASS`.

## Installation

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/Student-FastDev/Snapchat-Phone-Checker
    cd Snapchat-Phone-Checker
    ```

2. **Install Required Packages:**

    Install the necessary Python packages using `pip`:

    ```sh
    pip install -r requirements.txt
    ```

## Usage

### Running the Script

Execute the script from the command line:

```bash
python checker.py
```

### Configuration

1. **Proxy Configuration:**

    Edit the `proxy.txt` file to include your proxies in the following format:

    ```plaintext
    IP:PORT:USER:PASS
    ```

    Example:

    ```plaintext
    192.168.1.100:8080:username:password
    ```

2. **Account Combos:**

    Populate the `combo.txt` file with your Snapchat account credentials in the format:

    ```plaintext
    username:password
    ```

    Example:

    ```plaintext
    user1@example.com:password123
    user2@example.com:securepass456
    ```

3. **Settings Adjustment:**

    If the script generates a `settings.json` file upon first run, ensure to review and adjust any configurable parameters as needed.

## Troubleshooting

- **Dependencies Issues:**
  - Ensure all dependencies are correctly installed by running `pip install -r requirements.txt`.
  
- **Google Chrome Installation:**
  - Verify that Google Chrome is installed and updated to the latest version.

- **Proxy and Combo Format:**
  - Double-check the formatting in `proxy.txt` and `combo.txt` to ensure they adhere to the required `IP:PORT:USER:PASS` and `username:password` formats respectively.

- **Captcha Challenges:**
  - If captcha handling fails, consider using more reliable proxies or manually solving captchas as needed.

- **Error Messages:**
  - Refer to the error messages outputted by the script for specific guidance on resolving issues.

## Notes

- **Asynchronous Efficiency:** The script uses asynchronous programming to handle multiple accounts concurrently, significantly speeding up the phone number extraction process.
- **Proxy Reliability:** Using high-quality and reliable proxies is crucial to prevent IP bans and ensure smooth operation.
- **Security:** Handle your account credentials and proxy information securely to prevent unauthorized access.

---

<div align="center">  
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaTHhSVhfoSU_Y-m2cxpUmUqkYQ605zwhdaA&s" alt="Snapchat Logo" width="50px">
</div>
