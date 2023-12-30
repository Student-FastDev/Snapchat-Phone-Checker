# Snapchat Account Recovery Bot

This Python script, utilizing asynchronous programming and Selenium, is designed for recovering Snapchat accounts. It automates the login process, handles captchas, and extracts phone numbers associated with the accounts.

## Table of Contents
- [Introduction](#introduction)
  - [Purpose](#purpose)
  - [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Running the Script](#running-the-script)
  - [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Introduction

### Purpose
The Snapchat Account Recovery Bot assists in automating the process of recovering Snapchat accounts. It's particularly useful for handling multiple account recoveries, managing captchas, and retrieving phone numbers linked to the accounts.

### Features
- Automated login to Snapchat accounts.
- Captcha handling.
- Extraction of phone numbers linked to accounts.
- Usage of proxies for anonymity.

## Prerequisites
Before installation, ensure you have the following:
- Python 3.x
- Google Chrome
- ChromeDriver
- A set of proxies (optional)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/YourUsername/Snapchat-Recovery-Bot
   ```
2. Navigate to the script directory:
   ```
   cd Snapchat-Recovery-Bot
   ```
3. Install required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

### Running the Script

Execute the script from the command line:

   ```
   python snapchat_recovery.py
   ```

### Configuration

Edit `proxy.txt` and `combo.txt` as needed:

   ```
   proxy.txt: IP:PORT:USER:PASS
   combo.txt: username:password
   ```

The script uses proxies from `proxy.txt` and account combos from `combo.txt`.

## Troubleshooting
- Ensure all dependencies are installed.
- Check if ChromeDriver is compatible with your Google Chrome version.
- Verify the format of the proxies and combos.

For other issues, refer to the error messages provided by the script for guidance.
