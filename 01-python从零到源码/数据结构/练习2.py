'''
练习 2：词频统计
统计句子 `"the quick brown fox jumps over the lazy dog the end"` 里每个单词出现的次数。
'''
str = "the quick brown fox jumps over the lazy dog the end"
str = str.split()
dict = {}
for word in str:
    dict[word] = dict.get(word, 0) + 1

print(dict)