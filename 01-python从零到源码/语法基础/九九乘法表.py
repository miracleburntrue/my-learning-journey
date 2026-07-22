'''
练习题：九九乘法表
要求：整齐的输出一个九九乘法表
'''

for i in range(1,10):
    for j in range(1,i+1):
        print(f"{j}*{i}={j*i}",end="\t")
    print()