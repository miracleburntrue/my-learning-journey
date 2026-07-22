'''
练习题：BMI计算器
要求：输入身高体重，输出计算出的BMI值（保留一位小数），判断体重情况
'''
#输入身高、体重
height = float(input("身高(米):"))
weight = float(input("体重(kg):"))

#计算BMI
BMI = weight / (height ** 2)
print(f"计算出的BMI值是：{BMI:.1f}")

#根据BMI判断结果
if BMI <= 18.5:
    print("偏瘦")
elif BMI <= 23.9:
    print("正常")
elif BMI <= 27.9:
    print("超重")
else :
    print("肥胖")