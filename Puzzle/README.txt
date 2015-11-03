Web lab - Project 1 part 2
Qianxu Zeng
andrew id: qianxuz
2015.09.26

I used "w3school" (http://www.w3schools.com/) to learn some array operations, definitions.

Each div has an id, which is 0-15. 15 means it’s the blank div.
I created an array pos[][] to record the position of each div.
Initialization: pos[4][4] = {{0,1,2,3},{4,5,6,7},{8,9,10,11},{12,13,14,15}}

When a div is clicked:
Get its id, then find its index in pos[][].
Check whether the blank div is around this div.
top: flag = 1/ right: flag = 2/ down: flag = 3/ right: flag = 4
Based on the value of flag, we can exchange the backgroundImage, backgroundPosition and id 
of the blank div and the clicked div.
Then update the values of pos[][]
If is_shuffle is false, then check whether SUCCESS is true after each move.

shuffleTiles(): simulate mouse clicks.
Generate a random integer between 0-500 which is the times of click.
In each loop, generate a random integer between 0-15, which means the id of a div.
Then trigger click.

If reset is clicked, then do shuffleTiles()

tileKeydown() is similar to tileClicked()