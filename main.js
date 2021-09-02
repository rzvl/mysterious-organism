// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


// Factory function for creating Aequor instances

const pAequorFactor = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // simulates a mutation and returns the simulated strand
    mutate() {
      const randomNum = Math.floor(Math.random() * 15);
      const mutatedBase = this.dna[randomNum];
      const dnaBases = ['A', 'T', 'C', 'G'];
      const index = dnaBases.indexOf(mutatedBase);
      dnaBases.splice(index, 1);
      this.dna[randomNum] = dnaBases[Math.floor(Math.random() * 3)];
      return this.dna;
    },
    // compares 2 DNA strands and prints a message to console which tells
    // how many percent DNAs they have in common
    compareDNA(pAequor) {
      let similarBases = 0;
      for(let i = 0; i < 15; i++) {
        if(this.dna[i] === pAequor.dna[i]) {
          similarBases++;
        }
      }
      const percentOfSimilarity = (similarBases / 15) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentOfSimilarity.toFixed()}% DNA in common.`);
    },
    // checks if P. aequor have any chance of survival and returns true if it
    // can survive and false if there is no chance survival
    willLikelySurvive() {
      let NumOfCs = 0;
      let NumOfGs = 0;

      this.dna.forEach(base => {
        if(base === 'C') {
          NumOfCs++;
        } else if(base === 'G') {
          NumOfGs++;
        }
      });

      const percentOfCs = NumOfCs / 15 * 100;
      const percentOfGs = NumOfGs / 15 * 100;

      if(percentOfCs >= 60 || percentOfGs >= 60) {
        return true;
      } else {
        return false;
      }
    },
    // creates a complementary DNA strand for the current DNA strand and returns
    // the complementary DNA strand
    complementStrand() {
      const complementaryDnaStrand = [];
      this.dna.forEach(base => {
        let compBase;
        switch(base) {
          case 'A':
            compBase = 'T';
            break;
          case 'T':
            compBase = 'A';
            break;
          case 'C':
            compBase = 'G';
            break;
          case 'G':
            compBase = 'C';
            break;
        }
        complementaryDnaStrand.push(compBase);
      });
      return complementaryDnaStrand;
    }
  }
}


// creates 30 instances of pAequor that can survive in their natural environment
const survivingAequors = [];
let num = 1;

while (survivingAequors.length < 30) {
  const specimen = pAequorFactor(num, mockUpStrand());
  if(specimen.willLikelySurvive()) {
    survivingAequors.push(specimen);
    num++;
  }
}
