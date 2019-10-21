. download polimorf-xxxxxxxx.tab.gz from http://sgjp.pl/morfeusz/dopobrania.html
. unzip it
. open julia, include Tagset.jl, Morfeusz.jl, Liquify.jl (in that order)
. run Morfeusz.build("polimorf-xxxxxxxx.tab")
. run Liquify.build("polimorf-xxxxxxxx.tab","dict.db")
. output is saved into dict.db
. compress dict.db with LZMA compresor (e.g. using LZMA SDK binaries)