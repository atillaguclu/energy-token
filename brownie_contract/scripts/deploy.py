from brownie import VoltchainToken, accounts


def main():
    return VoltchainToken.deploy({"from": accounts[0]})
