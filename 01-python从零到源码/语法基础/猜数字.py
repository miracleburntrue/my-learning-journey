'''
练习题：猜数字
要求：随机生成一个1~100的整数，用户每次猜一个数字，如果猜错就输出猜大了或者猜小了，直到猜对为止
'''
import random
ans = random.randint(1,100)

your_ans = int(input("你猜的数字是："))

while your_ans != ans:
    if your_ans > ans:
        print("猜大了")
        your_ans = int(input("你猜的数字是："))
    else:
        print("猜小了")
        your_ans = int(input("你猜的数字是："))

print("恭喜你，猜对了")

