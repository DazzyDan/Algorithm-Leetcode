## Descent
### 1. Shoot the highest mountain and return its index
import sys
import math

# The while loop represents the game.
# Each iteration represents a turn of the game
# where you are given inputs (the heights of the mountains)
# and where you have to print an output (the index of the mountain to fire on)
# The inputs you are given are automatically updated according to your last actions.


# game loop
while True:
    maxHeight = 0
    for i in range(8):
        mountain_h = int(input())  # represents the height of one mountain.
        # shoot the maxHeight
        if(mountain_h > maxHeight):
            maxHeight = mountain_h
            mountainIndex = i
    # Write an action using print
    # To debug: print("Debug messages...", file=sys.stderr, flush=True)

    # The index of the mountain to fire on.
    print(mountainIndex )
    
## Power of Thor - Episode 1
### One time move one y and x
### output: are str combined with N NE E SE S SW W ou NW
## Beware: Take initialX = dicX into account
import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.
# ---
# Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.

# light_x: the X position of the light of power
# light_y: the Y position of the light of power
# initial_tx: Thor's starting X position
# initial_ty: Thor's starting Y position
light_x, light_y, initial_tx, initial_ty = [int(i) for i in input().split()]

# game loop
while True:
    remaining_turns = int(input())  # The remaining amount of turns Thor can move. Do not remove this line.
    move = ''
    # Write an action using print
    # To debug: print("Debug messages...", file=sys.stderr, flush=True)
    
    if (light_y > initial_ty):
        initial_ty +=1
        move +='S'
    elif(light_y < initial_ty):
        initial_ty -=1
        move +='N'
    if (light_x > initial_tx):
        initial_tx += 1
        move +='E'
    elif(light_x < initial_tx):
        initial_tx -=1
        move +='W'
    # A single line providing the move to be made: N NE E SE S SW W or NW
    print(move)
    
## Temperature:
### Search the closest zero temperature
### if negative = positive => print positive temperature
import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

n = int(input())  # the number of temperatures to analyse
if n <=0:
    print(0)
    quit()
minTem = sys.maxsize
for i in input().split():
    # t: a temperature expressed as an integer ranging from -273 to 5526
    t = int(i)
    
    if abs(t) < abs(minTem):
        minTem = t
    elif abs(t) == abs(minTem):
        minTem = max(t,minTem)

# Write an answer using print
# To debug: print("Debug messages...", file=sys.stderr, flush=True)

print(minTem)

### MIME TYPE
### find and print
### Beware : x.lower()
import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

n = int(input())  # Number of elements which make up the association table.
q = int(input())  # Number Q of file names to be analyzed.
mime = {}
for i in range(n):
    # ext: file extension
    # mt: MIME type.
    ext, mt = input().split()
    mime[ext.lower()] = mt
    # print(mime)
for i in range(q):
    fname = input().lower()
    # print(fname)
    # type generally is in the end
    i = fname.rfind('.')
    if i >=0 :
        ext = fname[i+1:]
    else: 
        ext = ''
    print(mime.get(ext,"UNKNOWN"))
        
