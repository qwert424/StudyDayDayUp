# Lodash

> 官网：https://lodash.com/docs
>
> 中文网：https://www.lodashjs.com/
>
> CDN：https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js

Lodash是一个针对ES的古老工具库，它出现在ES5之前

Lodash提供了大量的API，弥补了ES中对象、函数、数组API不足的问题

你可以想到的大部分工具函数，都可以在Lodash中找到

> 如果你不编写框架或通用库，一般不会用到Lodash

##数组
1、_.chunk(arr,size) 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。
2、_.compact(array) 创建一个新数组，包含原数组中所有的非假值元素。
3、_.concat(array, [values]) 创建一个新数组，将array与任何数组 或 值连接在一起。
4、_.difference(array, [values]) 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。
5、_.drop(array, [n=1])创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
6、_.fill(array, value, [start=0], [end=array.length]) 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
7、_.findIndex(array, [predicate=_.identity], [fromIndex=0]) 该方法类似_.find，区别是该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。
8、_.head(array) 获取数组 array 的第一个元素
9、_.last(array) 获取array中的最后一个元素。
10、_.flatten(array) 减少一级array嵌套深度
11、_.fromPairs(pairs) 这个方法返回一个由键值对pairs构成的对象。 类似于Object.fromEntries(entries)
12、_.indexOf(array, value, [fromIndex=0]) 返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。
13、_.lastIndexOf(array, value, [fromIndex=array.length-1]) 这个方法类似_.indexOf ，区别是它是从右到左遍历array的元素。
14、_.initial(array) 获取数组array中除了最后一个元素之外的所有元素（注：去除数组array中的最后一个元素）。
15、_.intersection([arrays]) 创建唯一值的数组，这个数组包含所有给定数组都包含的元素 注：可以理解为给定数组的交集）
16、_.join(array, [separator=',']) 将 array 中的所有元素转换为由 separator 分隔的字符串。
17、_.nth(array, [n=0]) 获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。
18、_.pull(array, [values]) 移除数组array中所有和给定值相等的元素 不同于difference 这个改变原数组
19、_.remove(array, [predicate=_.identity]) 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入3个参数： (value, index, array)。
20、_.reverse(array) 反转array，使得第一个元素变为最后一个元素，第二个元素变为倒数第二个元素，依次类推
21、_.slice(array, [start=0], [end=array.length]) 裁剪数组array，从 start 位置开始到end结束，但不包括 end 本身的位置。
22、_.sortedIndex(array, value) 使用二进制的方式检索来决定 value值 应该插入到数组中 尽可能小的索引位置，以保证array的排序。
23、_.sortedUniq(array) 这个方法类似_.uniq，除了它会优化排序数组
24、_.tail(array) 获取除了array数组第一个元素以外的全部元素。 _.drop(array,[n=1])
25、_.take(array, [n=1]) 创建一个数组切片，从array数组的起始元素开始提取n个元素。
26、_.union([arrays]) 创建一个按顺序排列的唯一值的数组。（注： arrays（数组）的并集，按顺序返回，返回数组的元素是唯一的）
27、_.uniq(array) 创建一个去重后的array数组副本。
28、_.unzip(array) 这个方法类似于_.zip，除了它接收分组元素的数组，并且创建一个数组，分组元素到打包前的结构。
29、_.without(array, [values]) 创建一个剔除所有给定值的新数组，剔除值的时候 不生成新数组
30、_.xor([arrays])创建一个给定数组唯一值的数组、返回值的顺序取决于他们数组的出现顺序。
31、_.zip([arrays])创建一个分组元素的数组，数组的第一个元素包含所有给定数组的第一个元素，数组的第二个元素包含所有给定数组的第二个元素，以此类推。

。。。。。
 很多很多