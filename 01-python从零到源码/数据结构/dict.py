'''
字典的基础知识汇总
'''
# 基础用法
my_dict = {"name":"烧真","age":22,"性别":"你猜"} #创建
print(my_dict["age"],my_dict["name"]) #查找 若没有这个键，则Keyerror
my_dict["area"] = "M78星云" #新增
print(my_dict)
del my_dict["性别"] #删除
print(my_dict)
my_dict = dict([('小明',100),('小红',80)]) #使用dict()函数构建字典
print(my_dict)

#字典的遍历
for key in my_dict:
    print(key,my_dict[key]) #按键遍历

for key,value in my_dict.items():
    print(key,"=",value) #.items()方法可以同时取出键和值

print(list(my_dict.keys())) #.keys()方法取出键
print(list(my_dict.values())) #.values()方法取出值

#字典推导式
print({x:x*x for x in (1,3,5)})

#安全的查找方法
score = {"小红":90}
print(score.get("小明")) #若没有这个键，返回None
print(score.get("小明",100)) #可以设置默认值,注意，返回默认值并不会修改字典本身，若要在字典添加对应键值对，可以用赋值解决

print(score.setdefault("小明",60)) #若没有，则设上默认值并返回默认值
print(score)
print(score.setdefault("小红",60)) #若有，则返回原本的值，不修改
print(score)
