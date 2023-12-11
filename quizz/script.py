def rreplace(s, old, new, occurrence):
    li = s.rsplit(old, occurrence)
    return new.join(li)

def transform_text(text):
    # Add a second slash to single slashes
    text = text.replace("\\","\\\\").replace("$"," $$ ")
    # Add two backslashes before capital N R Q C
    text = text.replace(" R"," \\\\R").replace(" N"," \\\\N").replace(" Z"," \\\\Z").replace("\\\\mathbb{R}","\\\\R")
    # Fix typos like "cl.dessous" to "ci-dessous"
    text = text.replace("princlpal","principal").replace("cl.dessous","ci-dessous")
    # Remove any stray backslashes at the end of the string
    text = text.replace("$$",'{"text": " $$',1)
    text = rreplace(text, "$$",'$$ ", "correct": false}',1)
    return text

# $$ ", "correct": false},

# Input text
input_text = r"   $ \cos (x)=0$ equivaut $\mathrm{d} x=\frac{\pi}{2}+k \pi$ avec $k \in Z$ $\cos (x)=0$ equivaut $\mathrm{A} x=\frac{\pi}{2}+k \pi(k \in Z)$ $\cos (x)=0$ equilvaut $\mathrm{a} x=\frac{\pi}{2}+k \pi, \forall k \in Z$ Soft $k \in Z, \cos (x)=0$ équlmut à $x=\frac{\pi}{2}+k \pi$ $\cos (x)=0$ equivaut $\mathrm{a} x=\frac{\pi}{2}+k \pi$ ou $k \in Z$ $\cos (x)=0$ equivaut a $a k c Z, x=\frac{\pi}{2}+k \pi$ $\cos (x)=0$ equivaut $A \forall k \in Z_3 x=\frac{\pi}{2}+k \pi$ $\forall k \in Z, \cos (x)=0$ equivaut $\mathbf{a} x=\frac{\pi}{2}+k \pi$ $\exists k \in Z, \cos (x)=0$ equilvaut a $x=\frac{\pi}{2}+k \pi$ $\cos (x)=0$ equivaut a Solt $k \in Z, x=\frac{\pi}{2}+k \pi$ $\cos (x)=0$ équivaut $\mathrm{A} x=\frac{\pi}{2}+k \pi$ pour $k \in Z$ "

# Transform the text
transformed_text = transform_text(input_text)
print( "\n" + transformed_text + "\n" )


