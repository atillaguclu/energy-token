from brownie import VoltchainToken, accounts, config


def read_contract():
    simple_storage = VoltchainToken[-1]  # Always gets the latest deploy
    print(simple_storage.retrieve())


def main():
    read_contract()
