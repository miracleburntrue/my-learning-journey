'''
练习1
写一个函数 `is_even(n)` 返回 n 是否偶数。
'''
def is_even(n):
    return not n%2

n = int(input("请输入一个整数:"))
if is_even(n):
    print(f"{n}是偶数")
else:
    print(f"{n}不是偶数")