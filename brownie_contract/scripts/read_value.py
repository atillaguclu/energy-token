from brownie import VoltchainToken, accounts, config


def read_contract():
    readValue = VoltchainToken[-1]  # Always gets the latest deploy
    print(readValue.retrieve())


def main():
    read_contract()
