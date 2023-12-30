# Snapchat Account Number Checker

This Python script, utilizing asynchronous programming and Selenium, is designed for getting number of Snapchat accounts. It automates the login process, handles captchas, and extracts phone numbers associated with the accounts.

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
The Snapchat Account Number Checker assists in automating the process of getting Snapchat accounts' numbers. It's particularly useful for sorting the accounts, and retrieving phone numbers linked to the accounts.

### Features
- Automated login to Snapchat accounts.
- Captcha handling.
- Extraction of phone numbers linked to accounts.
- Usage of proxies for anonymity.

## Prerequisites
Before installation, ensure you have the following:
- Python
- Google Chrome
- A set of proxies

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Student-FastDev/Snapchat-Phone-Checker
   ```
2. Navigate to the script directory:
   ```
   cd Snapchat-Phone-Checker
   ```
3. Install required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

### Running the Script

Execute the script from the command line:

   ```
   python checker.py
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
- Check if Google Chrome is installed.
- Verify the format of the proxies and combos.

For other issues, refer to the error messages provided by the script for guidance.
