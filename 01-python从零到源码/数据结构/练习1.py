'''
给定 nums = [3, 1, 4, 1, 5, 9, 2, 6]，用一行代码：
1. 取出所有偶数
2. 把每个数字平方
'''

nums = [3, 1, 4, 1, 5, 9, 2, 6]
print([i for i in nums if i%2==0]) #取出所有偶数
print([i*i for i in nums]) #把每个数字平方