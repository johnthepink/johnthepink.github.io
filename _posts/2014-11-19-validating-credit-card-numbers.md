---
title: Validating Credit Card Numbers
layout: post
categories: []
tags: []
---

Ever wonder how credit card numbers are generated? No? Me either, but then I had to figure it out this week. The process for generating and validating the numbers is known as the [Luhn algorithm](http://en.wikipedia.org/wiki/Luhn_algorithm).

There are a couple different variations to the Luhn algorithm that ultimately end up with the same result. Here are the steps I took to validate an existing card number, using the fake card `4716961168571677`:

  1. Remove the last digit: `[4, 7, 1, 6, 9, 6, 1, 1, 6, 8, 5, 7, 1, 6, 7]`
  2. Reverse the digits: `[7, 6, 1, 7, 5, 8, 6, 1, 1, 6, 9, 6, 1, 7, 4]`
  3. Multiply the odd digits by 2: `[14, 6, 2, 7, 10, 8, 12, 1, 2, 6, 18, 6, 2, 7, 8]`
  4. Subtract 9 if greater than 9: `[5, 6, 2, 7, 1, 8, 3, 1, 2, 6, 9, 6, 2, 7, 8]`
  5. Add digits together: `73`
  6. Multiply by 9: `657`
  7. Mod 10 (remainder of division by 10): `7`

Step 7 should be the last digit of the card number that you originally removed in step 1. You could just as easily generate a card number by taking a 15 digit number and using these same steps to find the 16th digit.

I, of course, did not calculate these by hand. I wrote a ruby script:

~~~ruby
def validate_card_number(num)
  # convert int to array of ints
  digits = num.to_s.chars.map(&:to_i)

  # remove last digit
  last_digit = digits.pop

  # reverse the digits
  digits.reverse!

  # multiply odd digits by 2
  # subtract 9 if greater than 9
  digits.collect!.with_index do |digit, i|
    digit *= 2 if i % 2 == 0
    digit -= 9 if digit > 9
    digit
  end

  # add digits together
  sum = digits.inject(:+)
  # multiply by 9
  sum *= 9

  # mod should equal last digit
  return sum % 10 == last_digit

end
~~~