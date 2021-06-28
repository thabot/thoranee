sudo apt-get install unzip
mrdir data_hgt
cd data_hgt


for i in 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5
do
    for j in 96 97 98 99 100 101 102 103 104 105 106
    do 

        iT = "${i}"
        ilength=${#iT}
        if [ ilength == 1 ] 
        then 
            iT = "0${iT}"
        fi 

        jT = "${j}"
        jlength=${#jT}
        if [ jlength == 2 ] 
        then 
            jT = "0${jT}"
        fi 

        wget -c "http://step.esa.int/auxdata/dem/SRTMGL1/N${iT}E${jT}.SRTMGL1.hgt.zip"
        unzip "http://step.esa.int/auxdata/dem/SRTMGL1/N${iT}E${jT}.SRTMGL1.hgt.zip"
        
    done

done





