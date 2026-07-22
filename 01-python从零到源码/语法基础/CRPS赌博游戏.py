'''
说明：CRAPS又称花旗骰，是美国拉斯维加斯非常受欢迎的一种的桌上赌博游戏。
该游戏使用两粒骰子，玩家通过摇两粒骰子获得点数进行游戏。
简化后的规则是：玩家第一次摇骰子如果摇出了 7 点或 11 点，玩家胜；
玩家第一次如果摇出 2 点、3 点或 12 点，庄家胜；
玩家如果摇出其他点数则游戏继续，玩家重新摇骰子，如果玩家摇出了 7 点，庄家胜；
如果玩家摇出了第一次摇的点数，玩家胜；其他点数玩家继续摇骰子，直到分出胜负。
为了增加代码的趣味性，我们设定游戏开始时玩家有 1000 元的赌注，每局游戏开始之前，玩家先下注，
如果玩家获胜就可以获得对应下注金额的奖励，如果庄家获胜，玩家就会输掉自己下注的金额。
游戏结束的条件是玩家破产（输光所有的赌注）或者一局结束后玩家不想玩了。
'''
import random

money = 1000 #设置初始资金
flag = True #标记游戏是否继续

while flag :
    if money <= 0:
        print("您的赌金已耗尽，欢迎下次再来！")
        break
    turn , dice1 , dice2 = 1 , 0 , 0 #初始化对局
    wager = int(input("请投入赌注："))
    while wager < 0 or wager > money:
        wager = int(input("投入的赌注不合规，请重新投入："))
    print(f"本轮玩家投入赌注：{wager}") #投入赌注
    dice1 , dice2 = random.randint(1,6) , random.randint(1,6)
    dice = dice1 + dice2
    print(f"第一轮掷骰的点数为{dice1}，{dice2}，点数和为{dice}。")
    if dice == 7 or dice == 11:
        money += wager
        print(f"玩家胜利！你现在持有的赌金为：{money}元。")
        flag = (input("是否进行下一轮游戏（是输入True，否输入False）：")=='True')
        if not flag:
            print(f"您的剩余赌金为{money}元，净收益{money-1000}元，欢迎下次再来！")
    elif dice == 2 or dice == 3 or dice == 12:
        money -= wager
        print(f"玩家失败！你现在持有的赌金为：{money}元。")
        flag = (input("是否进行下一轮游戏（是输入True，否输入False）：")=='True')
        if not flag:
            print(f"您的剩余赌金为{money}元，净收益{money-1000}元，欢迎下次再来！")
    else:
        while True:
            turn += 1
            dice1 , dice2 = random.randint(1,6) , random.randint(1,6)
            print(f"第{turn}轮投掷，点数分别为{dice1}，{dice2}，总点数为{dice1+dice2}。")
            if dice1 + dice2 == dice:
                money += wager
                print(f"玩家胜利！你现在持有的赌金为：{money}元。")
                flag = (input("是否进行下一轮游戏（是输入True，否输入False）：")=='True')
                if not flag:
                    print(f"您的剩余赌金为{money}元，净收益{money-1000}元，欢迎下次再来！")
                break
            elif dice1 + dice2 == 7:
                money -= wager
                print(f"玩家失败！你现在持有的赌金为：{money}元。")
                flag = (input("是否进行下一轮游戏（是输入True，否输入False）：")=='True')
                if not flag:
                    print(f"您的剩余赌金为{money}元，净收益{money-1000}元，欢迎下次再来！")
                break
            else:
                print("本局游戏继续。")
